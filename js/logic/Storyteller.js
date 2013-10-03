var Storyteller = function(brain) {
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

    var phrase = '';
    if (!moment) return phrase;
    var context = moment.context || {};
    context.time = context.time || 'past';
    phrase = brain.speech.express.moment(moment, context);
    brain.memory.short.remember(moment);
    return phrase;
  }


  st.getStoryExcerpt = function (seed) {

    var excerpts = brain.extractor.momentsFromSeed(seed);

    if(_.isEmpty(excerpts)) return "I don't know anything about that."
    var excerpt = _.sample(excerpts);

    var context = {};
    context.time = 'past';
    context.rel = 'once';
    var remark = brain.speech.express.moment(excerpt,context);

    return remark;

  }
}