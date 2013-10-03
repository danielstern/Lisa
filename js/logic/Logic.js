function Logic(brain) {

  var logic = this;

  logic.counterposer = new Counterposer(brain);
  logic.storyteller = new Storyteller(brain);
  logic.emotionalizer = new Emotionalizer(brain);

  logic.tellStory = logic.storyteller.tellStory;
  logic.counterpose = logic.counterposer.counterpose;

  logic.getStoryExcerpt = logic.storyteller.getStoryExcerpt;

  logic.emote = logic.emotionalizer.getEmotionalRemark;

  logic.expressInheritance = function(seed) {

  	if (_.isEmpty(seed.extends)) return "Nothing, as far as I know."
  	var parentWord = _.sample(seed.extends);
  	var parent = brain.whatIs(parentWord);
  	var generality = brain.speech.express.generality(seed,parent);
  	return generality;
  }

}