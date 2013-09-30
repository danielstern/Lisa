var Expresso = function (brain) {
  express = this;
  express.brain = brain;
  var context;

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

  express.learn(standardExpressions1);
  express.learn(casualExpressions);

  express.conjugate = function (seed, verb, tense, context) {

    console.log('Express is Conjugating: ',seed, verb, tense, context);

    if (_.oneToMany(seed) instanceof Array) {
      context = 'plural';
    }

    seed = seed || {};
    if (typeof seed == 'string') seed = brain.whatIs(seed);
    seed = seed || {};

    tense = tense || 'present';



    var tl = transliterate;
    if (!context) {
      context = 'plural';
      if (seed.pronoun == 'unique') context = 'singular';
      if (!seed.plural) context = 'singular';
    }

    var synonyms = _.getVerbSynonyms(verb);
    if (synonyms && synonyms[0]) verb = _.sample(synonyms);

    try {
      var verb = tl[verb][tense][context];
    } catch (e) {
      console.error('You are trying to access a verb not in the lexiary: ', verb)
    }
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
    var synonym = _.sample(idea.synonyms || []) || idea.word;

    return synonym;
  }

  express.preposit = function (word, context) {


       context = context || {};

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

    //var things = word.replace(/[$]/gi, '');
    if (_.stringContains(word, '$')) {
      word = word.replace(/[$]/gi, '');
      var property = word.split(':')[0];
      word = word.split(':')[1];

       var propertyIdea = brain.whatIs(property);
       var isAdjective = false;
      if ( propertyIdea /*&& brain.whatIs(property).form != adjective*/) {

         if (propertyIdea.form != 'adjective') {
           context.pronoun = 'none';
         }

        if (propertyIdea.form == 'adjective') {
          isAdjective = true;
          if (propertyIdea.noPronoun) context.pronoun = 'none';
        } 

      }
      word = preposit(property,{pronoun:'referenced'}) + (isAdjective ? " " : ' of ') + preposit(word);
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

    // if the context suggests the word is referenced, and it is not a proper word, give it a referenced pronoun (it will conjugate with "the")
    if (context.referenced && idea.pronoun != 'proper' && idea.pronoun != 'force') idea.pronoun = 'referenced';
    if (idea.pronoun == 'proper') idea.word = _.capitalize(idea.word);


  //  console.log('Prepositing 3', word, idea, context);

    
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

  //  console.log('prepositing 4', word, idea, context);

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
  window.preposit = express.preposit;
  window.lexicate = express.lexicate;
  window.verbalize = express.verbalize;
  window.conjugate = express.conjugate;
  window.synonomize = express.synonomize;
}