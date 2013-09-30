function Lexicator() {
  var lx = this;
  lx.things = [];
  //lx.attributes = [];

  lx.learn = function (words) {

  	if (typeof words == 'string') words = [words];

    _.each(words, function (word) {
      lx.absorb(word);
    })

  }

  lx.absorb = function (word) {
  //	console.log('absorbing...',word)
  	/*if (word.form == 'adjective') {
  		lx.attributes.push(word);
  	}
  	else {
  	  lx.things.push(word);	
  	}*/
  	lx.things.push(word);	
  }

  lx.learn(_things);
  lx.learn(_attributes);
  lx.learn(_sayings);

  lx.getWord = function (word) {
  	if (!word) return;
  	var ideas = _.filter(lx.things,function(wordIdea){
  		if (_.compare(wordIdea.word, word)) return true;
  		if (_.compare(wordIdea.plural, word)) return true;
  		if (_.compare(wordIdea.said, word)) return true;
  	});
  	return ideas[0];

  }

  lx.getRandomWord = function () {

  	var idea = _.sample(words);
  	return idea;

  }

}