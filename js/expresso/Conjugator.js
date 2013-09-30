function Conjugator() {
	var cj = this;
	cj.allVerbs = {};

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

	}
}