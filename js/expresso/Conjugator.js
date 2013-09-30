function Conjugator() {
	var cj = this;
	cj.allVerbs = {};
	var tl = cj.allVerbs;

	cj.learn = function (lexiaryOrWord, verb) {
		if (verb) var word = lexiaryOrWord;
    if (verb) {
      cj.allVerbs[word] = verb;
      return;
    }

    var lexiary = lexiaryOrWord;
	    var verbs = _.pairs(lexiary);

	    _.each(verbs, function (verb) {
	      cj.learn(verb[0], verb[1]);
	    })

  }

  cj.learn(verbs);

	cj.getWord = function(verb, tense, context) {

		if (!verb) return;
		tense = tense || 'present';
		context = context || 'singular';

		if (!_.has(tl,verb)) {
			console.error('This verb is not in the lexiary',verb);
			return verb;
		}


		var verbIdea = tl[verb];
		var verbeTense;

		if (!_.has(verbIdea, tense)) {
			console.log('This verb does not have the following tense',verb,tense);
			return verb;
		}

		verbeTense = verbIdea[tense];

		if (!_.has(verbeTense, context)) {
			console.log('This verb does not have a context for following tense',verb,tense,context);
			return verb;
		}


		var word = verbeTense[context];

    return word;

	}


	cj.getIdea = function(verb) {

		if (!verb) return;

		if (!_.has(tl,verb)) {
			console.error('IDEA: This verb is not in the lexiary',verb);
			return verb;
		}

		var verbIdea = tl[verb];
		verbIdea.form = 'verb';

		console.log('getidea...',verb,verbIdea)
		
    return verbIdea;

	}
}