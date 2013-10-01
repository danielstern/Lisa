var Expresso = function (brain) {
  var expresso = this;
  var express = expresso;
  expresso.brain = brain;
  expresso.conjugator = new Conjugator(brain);
  expresso.lexicator = new Lexicator(brain);
  expresso.prepositor = new Prepositor(brain);
  expresso.extractor = new Extractor(brain);
  expresso.momento = new Momento(brain);
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

  expresso.getVerbSynonyms = function(verb) {
    var cj = expresso.conjugator;
    idea = cj.getIdea(verb);
    if (!idea || !idea.synonyms) return [verb];
    var synonyms = idea.synonyms;
   // console.log('returning synonyms...',synonyms)
    return synonyms;


  },

  expresso.moment = expresso.momento.moment;


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

    var synonyms = express.getVerbSynonyms(verb);
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

  expresso.learn(expressions);
}