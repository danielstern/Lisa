var Expresso = function (brain) {
  express = this;
  express.brain = brain;

  express.learn = function (expression, operation) {
    if (operation) {
      express[expression] = operation;
      return;
    }

    console.log('express is learning...', expression);

    var expressions = _.pairs(expression);

    console.log('express got expreession...', expressions);
    _.each(expressions, function (expression) {
      express.learn(expression[0], expression[1]);
    })

  }

  express.learn(standardExpressions1);
  express.learn(casualExpressions);
  express.learn(formalExpressions);

  express.conjugate = function (seed, verb, tense) {

    if (typeof seed == 'string') seed = brain.whatIs(seed);

    tense = tense || 'present';

    var tl = transliterate;
    var context = 'plural';
    if (seed.pronoun == 'unique') context = 'singular';
    if (!seed.plural) context = 'singular';

    var verb = tl[verb][tense][context];
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

  express.preposit = function (word) {

    var preposition = '';
    var pronoun = '';

    word = word || '';

    var idea = express.brain.whatIs(word, true);

    if (!idea) {

      idea = {
        pronoun: ''
      }
    }

    if (word == idea.plural) idea.pronoun = 'pluralize';

    var returnWord = true;
    
    switch (idea['pronoun']) {
    case 'unique':
      preposition = 'the';
      break;
    case 'proper':
    case 'none':
    case 'pluralize':
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

    if (preposition) preposition += " ";
    return preposition + (returnWord ? word : '');

  }
  window.preposit = express.preposit;
  window.lexicate = express.lexicate;
  window.verbalize = express.verbalize;
  window.conjugate = express.conjugate;
}