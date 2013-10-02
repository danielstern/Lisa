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
  	lx.things.push(word);	
  }

  

  lx.getWord = function (word) {
  	if (!word) return;
    var ideas = _.filter(lx.things,function(wordIdea){
      if (_.compare(wordIdea.word, word)) return true;
      if (_.compare(wordIdea.plural, word)) return true;
      if (_.compare(wordIdea.said, word)) return true;
    });
 // console.log('getting word...',word,ideas)
    return ideas[0];

  }

   lx.getAllAttributes = function () {
    var allAttributes = [];
    allAttributes = _.filter(lx.things,function(wordIdea){
      if (wordIdea.form == 'adjective') return true;
    });

    return allAttributes;

  }

  lx.getRandomWord = function () {

  	var idea = _.sample(lx.things);
  	return idea;

  }

}