define("logic/Storyteller",[],  function() {
 
  return function Storyteller (brain) {
	var st = this;

	st.tellStory = function (seed) {

   	var response = '';
    var longTerm = brain.memory.long;

    story = longTerm.getRandomStory(seed);

    if (!story) return "No stories about that.";

    var sequence = ex.storyToMoments(story)
    
    _.each(sequence, function (moment) {

      var phrase = st.tellStoryMoment(moment);
      response += phrase;
      response += brain.speech.softPause();

     });

    return response;
  }

  st.tellStoryMoment = function (moment) {

    var momentObject = brain.getMomentObject(moment);
    
    var context = new brain.ContextObject(momentObject.context);
    context.time = context.time || 'past';

    brain.memory.short.remember(momentObject);
    
    if (momentObject.general) return brain.speech.express.generality(momentObject, context);
    return brain.speech.express.moment(momentObject, context);

  }


  st.getStoryExcerpt = function (seed) {

    var excerpts = brain.extractor.momentsFromSeed(seed);

    if(_.isEmpty(excerpts)) return "I don't know anything about that."
    var excerpt = _.sample(excerpts);

    var context = brain.getContextObject();
    context.time = 'past';
  //  context.rel = 'once';
    var remark = brain.speech.express.moment(excerpt,context);

    return remark;

  }
}
});