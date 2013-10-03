function Logic(brain) {

  var logic = this;

  logic.counterposer = new Counterposer(brain);
  logic.storyteller = new Storyteller(brain);
  logic.emotionalizer = new Emotionalizer(brain);

  logic.tellStory = logic.storyteller.tellStory;
  logic.counterpose = logic.counterposer.counterpose;

  logic.getStoryExcerpt = logic.storyteller.getStoryExcerpt;

  logic.emote = logic.emotionalizer.getEmotionalRemark;

}