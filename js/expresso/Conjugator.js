function Conjugator() {
  var cj = this;
  cj.allVerbs = {};
  var tl = cj.allVerbs;

  cj.learn = function (lexiary, verb) {
    
    var verbs = _.pairs(lexiary);

    _.each(verbs, function (verb) {
      cj.absorb(verb[0], verb[1]);
    })

  }

  cj.absorb = function (word, verb) {
    cj.allVerbs[word] = verb;
    return;
  }



  cj.getWord = function (verb, tense, context) {

    //console.log('get word 1',verb, tense, context);
    if (tense.time) {
      console.log('got context object');
      var contextObject = tense;
      tense = contextObject.tense;
      context = contextObject.plural ? 'plural' : 'singular';
    }

   // console.log('Get word 2',verb,tense,context)

    if (!verb) return;
    tense = tense || 'present';
    context = context || 'singular';

    if (!_.has(tl, verb)) {
      console.error('This verb is not in the lexiary', verb);
      return verb;
    }


    var verbIdea = tl[verb];
    var verbeTense;

    if (!_.has(verbIdea, tense)) {
      console.log('This verb does not have the following tense', verb, tense);
      return verb;
    }

    verbeTense = verbIdea[tense];

    if (!_.has(verbeTense, context)) {
      console.log('This verb does not have a context for following tense', verb, tense, context);
      return verb;
    }


    var word = verbeTense[context];

    return word;

  }


  cj.getIdea = function (verb) {

    if (!verb) return;

    if (!_.has(tl, verb)) {
      console.error('IDEA: This verb is not in the lexiary', verb);
      return verb;
    }

    var verbIdea = tl[verb];
    verbIdea.form = 'verb';

    //		console.log('getidea...',verb,verbIdea)

    return verbIdea;

  }
}