var Expresso = function (brain) {
  var expresso = this;
  expresso.brain = brain;
  expresso.conjugator = new Conjugator();
  expresso.lexicator = new Lexicator();
  expresso.prepositor = new Prepositor();
  window.cj = expresso.conjugator;
  window.lx = expresso.lexicator;

  
  expresso.learn = function (expression, operation) {
    if (operation) {
      expresso[expression] = operation;
      return;
    }

    var expressions = _.pairs(expression);

    _.each(expressions, function (expression) {
      expresso.learn(expression[0], expression[1]);
    })

  }

  expresso.conjugate = function (seed, verb, tense, context) {

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

    verb = expresso.conjugator.getWord(verb, tense, context)

    response = verb;

    return response;
  }


  expresso.verbalize = function (seed, relationship) {

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

  expresso.synonomize = function (word) {

    var idea = brain.whatIs(word, true);
   //  console.log('Synonomize,',word,idea)
    if (_.isEmpty(idea.synonyms)) return word;
    var synonyms = idea.synonyms;
    var synonym = _.sample(synonyms.concat([word]));

    return synonym;
  }

  expresso.preposit = expresso.prepositor.preposit;

  expresso.learn(moment);
  expresso.learn(expressions);

  window.preposit = expresso.preposit;
  window.lexicate = expresso.lexicate;
  window.verbalize = expresso.verbalize;
  window.conjugate = expresso.conjugate;
  window.synonomize = expresso.synonomize;
}