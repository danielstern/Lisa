function Conjugator(brain) {
  var cj = this;
  cj.allVerbs = {};
  var tl = cj.allVerbs;

  cj.conjugate = function (seed, verb, tense, context) {

    var lx = brain.speech.lexicator;

    if (_.oneToMany(seed) instanceof Array) {
      context = context || 'plural';
    }

    var seedIdea = _.isString(seed) ? brain.whatIs(seed) : seed;

    tense = tense || 'present';
    if (!seedIdea) return console.error("Can't conjugate",arguments)

    context = context || 'plural';
    if (seedIdea.pronoun == 'unique') context = context || 'singular';
    if (!seedIdea.plural) context = context || 'singular';

    var synonyms = lx.getVerbSynonyms(verb);
//    if (synonyms) verb = _.sample(synonyms);
    if (synonyms) verb = _.sample(synonyms);

    verb = cj.getConjugatedVerb(verb, tense, context)

    response = verb;

    return response;
  }


  cj.getConjugatedVerb = function (verb, tense, context) {

    if (!verb) return;
    tense = tense || 'present';
    context = context || 'singular';

    var lx = brain.speech.lexicator;
    var verbIdea = lx.getVerbIdea(verb);
    if (!verbIdea) {
      console.warn('This verb is not in the lexiary', verb);
      return verb;
    }

    var verbeTense;

    if (!_.has(verbIdea, tense)) {
      console.warn('This verb does not have the following tense', verb, tense);
      return verb;
    }

    verbeTense = verbIdea[tense];

    if (!_.has(verbeTense, context)) {
      console.warn('This verb does not have a context for following tense', verb, tense, context);
      return verb;
    }


    var word = verbeTense[context];

    return word;

  }



}