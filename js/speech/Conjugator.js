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

    return cj.getConjugatedVerb(verb, tense, context);

  }


  cj.getConjugatedVerb = function (verb, tense, context) {

    verb = verb || 'is';
    tense = tense || 'present';
    context = context || 'singular';

    var lx = brain.speech.lexicator;
    var verbeTense;

    var verbIdea = lx.getVerbIdea(verb);
    if (!verbIdea) return warnOut('This verb is not in the lexiary: ' + verb , verb);
    if (!_.has(verbIdea, tense)) return warnOut('This verb does not have the following tense' + tense, verb);
      
    verbeTense = verbIdea[tense];

    if (!_.has(verbeTense, context)) return warnout('This verb does not have a context for following tense ' + context + " " + tense, verb);


    var word = verbeTense[context];
    return word;
  }
  
  function warnOut(phrase,verb) {console.warn(phrase);return verb};

}