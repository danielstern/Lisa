var Expresso = function (brain) {
  express = this;
  express.brain = brain;

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
  express.learn(formalExpressions);

  express.conjugate = function (seed, verb, tense) {

    seed = seed || {};
    if (typeof seed == 'string') seed = brain.whatIs(seed);
    seed = seed || {};

    tense = tense || 'present';

    var tl = transliterate;
    var context = 'plural';
    if (seed.pronoun == 'unique') context = 'singular';
    if (!seed.plural) context = 'singular';
    try {
    var verb = tl[verb][tense][context];
    } catch (e) {
      console.error('You are trying to access a verb not in the lexiary: ',verb)
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

  express.lexicate = function (seed) {

    if (typeof seed == 'string') seed = {
      word: seed
    };
    response = (seed.pronoun == 'unique' ? preposit(seed.word) : (seed.plural || preposit(seed.word)));

    return response;
  }

  express.synonomize = function (word) {

    var idea = brain.whatIs(word,true);
    var synonym = _.sample(idea.synonyms || []) || idea.word;

    return synonym;
  }

  express.preposit = function (word, context) {

    if(_.stringContains(word,'<')) {
      var words = word.replace(/[<>]/gi,'').split('&');
      var propositedWords = _.map(words,function(word){return preposit(word)}); 
      return _.toSentence(propositedWords);
    }

    if(_.stringContains(word,'$')) {
      word = word.replace(/[$]/gi,'');
      var property = word.split(':')[0];
      word = word.split(':')[1];
      word = property + " " + word;
      adjective = property;
    }

    var idea;
    if (word && typeof word != 'string') {
      idea = word;
      word = idea.word;
    }
    

    
    var preposition = '';
    var adjective = '';
    var assumed = false;
    var referenced = false;
    context = context || {};

    word = word || '';

    if (word.split('|').length > 1) {
      var directive = word.split('|')[0];
      word = word.split('|')[1];

      switch (directive) {
        case 'referenced':
        case 'main':
          referenced = true;
          break;
        case 'assumed':
          assumed = true;
          break;
      }
    }

    idea = idea || express.brain.whatIs(word, true) || {};
    console.log('prepositing...',word,idea,context);

  //  if (word == idea.plural) idea.pronoun = 'pluralize';
    if (context.pronoun) idea.pronoun = context.pronoun;
    if (idea.pronoun == 'plural' && idea.plural) word = idea.plural;
    if (idea.form == "adjective") {
      idea.pronoun = 'none'
      word = synonomize(idea.word);
    }
    if (referenced && idea.pronoun != 'proper' && idea.pronoun != 'force') idea.pronoun = 'referenced';

    //console.log('preposit...',word,context,idea);


    var returnWord = true;
    
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

    if (assumed) {
      console.log('context?',context);
      var objective = context.objective;
      if (idea.gender) {
        if (idea.gender == 'male') return objective ? 'him' : 'he'; 
        if (idea.gender == 'female') return objective ? 'her' : 'she';
        if (idea.gender == 'mixed') return objective ? 'them' : 'they';
      }
      return 'it';
    }

    if (preposition) preposition += " ";
    return preposition + (returnWord ? word : '');

  }
  window.preposit = express.preposit;
  window.lexicate = express.lexicate;
  window.verbalize = express.verbalize;
  window.conjugate = express.conjugate;
  window.synonomize = express.synonomize;
}