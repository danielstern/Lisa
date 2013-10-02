function Lexicator(speech) {
  var lx = this;
  var brain = speech.brain;
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


  lx.getVerbSynonyms = function(verb) {
    var cj = speech.conjugator;
    idea = cj.getIdea(verb);
    if (!idea || !idea.synonyms) return [verb];
    var synonyms = idea.synonyms;
   // console.log('returning synonyms...',synonyms)
    return synonyms;

  }

  lx.synonomize = function (word) {

    var idea = brain.whatIs(word, true);
   //  console.log('Synonomize,',word,idea)
    if (_.isEmpty(idea.synonyms)) return word;
    var synonyms = idea.synonyms;
    var synonym = _.sample(synonyms.concat([word]));

    return synonym;
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