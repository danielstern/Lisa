var Expresso = function (brain) {
  express = this;
  express.brain = brain;
  express.conjugator = new Conjugator();
  express.lexicator = new Lexicator();
  express.prepositor = new Prepositor();
  window.cj = express.conjugator;
  window.lx = express.lexicator;

  
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
   //  console.log('Synonomize,',word,idea)
    if (_.isEmpty(idea.synonyms)) return word;
    var synonyms = idea.synonyms;
    var synonym = _.sample(synonyms.concat([word]));

    return synonym;
  }

  express.preposit = express.prepositor.preposit;

  express.learn(moment);
  express.learn(expressions);

  window.preposit = express.preposit;
  window.lexicate = express.lexicate;
  window.verbalize = express.verbalize;
  window.conjugate = express.conjugate;
  window.synonomize = express.synonomize;
}