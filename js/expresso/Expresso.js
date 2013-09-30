var Expresso = function (brain) {
  express = this;
  express.brain = brain;
  express.conjugator = new Conjugator();
  express.lexicator = new Lexicator();
  window.cj = express.conjugator;
  window.lx = express.lexicator;

  express.conjugate = function (seed, verb, tense, context) {

    // console.log('Expresso is Conjugating: ',seed, verb, tense, context);

    if (_.oneToMany(seed) instanceof Array) {
      context = 'plural';
    }

    seed = seed || {};
    if (typeof seed == 'string') seed = brain.whatIs(seed);
    seed = seed || {};

    tense = tense || 'present';

    if (!context) {
      context = 'plural';
      if (seed.pronoun == 'unique') context = 'singular';
      if (!seed.plural) context = 'singular';
    }

    var synonyms = _.getVerbSynonyms(verb);
    if (synonyms && synonyms[0]) verb = _.sample(synonyms);

    verb = express.conjugator.getWord(verb, tense, context)

    response = verb;

    return response;
  }


  express.verbalize = function (seed, relationship) {

    var response = '';

    switch (relationship.action) {
    case 'weakness':
      response = conjugate(seed, 'is') + ' weak against'
      break;
    case 'rule':
      response = conjugate(seed, 'is') + ' ruler of';
      break;
    case 'effective':
      response = conjugate(seed, 'is') + ' effective against';
      break;
    case 'use':
      response = conjugate(seed, 'use');
      break;
    }

    return response;
  }

  express.synonomize = function (word) {

    var idea = brain.whatIs(word, true);
    console.log('Synonomize,',word,idea)
    if (_.isEmpty(idea.synonyms)) return word;
    var synonyms = idea.synonyms;
    var synonym = _.sample(synonyms.concat([word]));

    return synonym;
  }

  express.preposit = function (word, context) {


    context = context || {};

 //  console.log('Prepositing 1:', word, context)

    // if preposit is passed an array, assume the first item in the array is the word
    if (word instanceof Array) word = word[0];

    // Multiple subjects, as in <paul&john>
    if (_.stringContains(word, '<')) {
      var words = word.replace(/[<>]/gi, '').split('&');
      var propositedWords = _.map(words, function (word) {
        return preposit(word)
      });
      return _.toSentence(propositedWords);
    }

    // A subject with a property, e.g $new:bike$
    if (_.fizzle(word) && _.fizzle(word).thing) {
      var property = _.fizzle(word).has;
      word = _.fizzle(word).thing;

      //console.log('fizzle?',word,_.fizzle(word))

      var propertyIdea = brain.whatIs(property);
      var isAdjective = false;
      if (propertyIdea) {

        if (propertyIdea.form != 'adjective') {
          context.pronoun = 'none';
        }

        if (propertyIdea.form == 'adjective') {
          isAdjective = true;
          if (propertyIdea.noPronoun) context.pronoun = 'none';
        }

      }

      var newWordContext = {};
      if (propertyIdea.form == 'adjective') newWordContext.pronoun = 'none';
      
      word = preposit(property, {
        pronoun: 'referenced'
      }) + (isAdjective ? " " : ' of ') + preposit(word,newWordContext);
      adjective = property;
    }

    // if preposit is passed an object instead of a string (works on either)
    var idea;
    if (word && typeof word == 'object') {
      idea = word;
      word = idea.word;
    }

    var adjective = '';
    word = word || '';

    if (word.split('|').length > 1) {
      var directive = word.split('|')[0];
      word = word.split('|')[1];

      switch (directive) {
      case 'my':
        context.possessive = true;
        context.possessor = 'self';
        break;
      case 'his':
        context.possessive = true;
        context.possessor = 'male';
      case 'her':
        context.possessive = true;
        context.possessor = 'female';
      case 'referenced':
      case 'main':
        context.referenced = true;
        break;
      case 'assumed':
        context.assumed = true;
        break;
      }
    }


    if (typeof idea == 'string') idea = express.brain.whatIs(idea, true)

    idea = idea || express.brain.whatIs(word, true) || {};
    word = word || idea.word;

    // if the word is the plural form of the word, give it a plural pronoun, i.e., "skeletons" automatically get a plural pronoun
    if (word == idea.plural) idea.pronoun = 'plural';

    // if the context suggest a pronoun, override the existing one if it is not 'proper' or 'force';
    if (context.pronoun && idea.pronoun != 'proper' && idea.pronoun != 'force') idea.pronoun = context.pronoun;

    // if the context suggest a plural pronoun, use the words plural in place of the word, if it has one
    if (context.pronoun == 'plural' && idea.plural) word = idea.plural;

    // if the idea is an adjective, give it no pronoun and grab a synonym of it, for fun
    if (idea.form == "adjective") {
      idea.pronoun = 'none'
      word = synonomize(idea.word);
    }
   // console.log('Prepositing 2:', word, idea, context)

    // if the context suggests the word is referenced, and it is not a proper word, give it a referenced pronoun (it will conjugate with "the")
    if (context.referenced && idea.pronoun != 'proper' && idea.pronoun != 'force') idea.pronoun = 'referenced';
    if (idea.pronoun == 'proper') idea.word = _.capitalize(idea.word);

    // based on the idea object, choose a preposition
    var returnWord = true;
    var preposition = '';

    switch (idea['pronoun']) {
    case 'unique':
    case 'referenced':
      preposition = 'the';
      break;
    case 'proper':
    case 'none':
    case 'force':
    case 'pluralize':
    case 'plural':
    case 'concept':
      preposition = '';
      break;
    case 'self':
      preposition = 'I';
      returnWord = false;
      break;
    default:
      switch (word.toLowerCase().charAt(0)) {
      case 'a':
      case 'e':
      case 'i':
      case 'u':
      case 'o':
        preposition = 'an';
        break;
      default:
        preposition = 'a';
      }
      break;
    }

    if (context.possessive) {
      switch (context.possessor) {
      case 'me':
      case 'self':
      case 'I':
        preposition = 'my';
        break;
      case 'male':
        preposition = 'his';
        break;
      case 'female':
        preposition = 'her';
        break;
      default:
        preposition = 'their'
        break;
      }
    }

    // if the context suggests this words identity is assumed, replace it with the appropriate pronoun
    if (context.assumed) {
      var objective = context.objective;
      if (idea.gender) {
        if (idea.gender == 'male') return objective ? 'him' : 'he';
        if (idea.gender == 'female') return objective ? 'her' : 'she';
        if (idea.gender == 'mixed') return objective ? 'them' : 'they';
      }
      return 'it';
    }

    // add a space after the preposition, if it exists
    if (preposition) preposition += " ";

    var response = preposition + (returnWord ? word : '')
    return response;

  }

  express.learn = function (expression, operation) {
    if (operation) {
      express[expression] = operation;
      return;
    }

    var expressions = _.pairs(expression);

    _.each(expressions, function (expression) {
      express.learn(expression[0], expression[1]);
    })

  }

  express.learn(moment);
  express.learn(expressions);

  window.preposit = express.preposit;
  window.lexicate = express.lexicate;
  window.verbalize = express.verbalize;
  window.conjugate = express.conjugate;
  window.synonomize = express.synonomize;
}