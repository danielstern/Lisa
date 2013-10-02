var Storyteller = function(brain) {
	var st = this;


	st.tellStory = function (seed) {

    	var response = '';

    stories = brain.memory.long.getStories(seed);
    var story = _.sample(stories);

    var storyIdeas = _.shuffle(ex.extractStory(story));

    brain.memory.short.remember(storyIdeas);

   // console.log('tell story', seed)
    if (!story) return response;

    if (_.has(story, 'epic')) {

      var nextUntoldParable = _.find(story.epic, function (parable) {
        if (brain.memory.short.recall(parable)) return false;
        return parable;
      });

     // console.log('next parable?',nextUntoldParable);

      if (!nextUntoldParable) {
        response += "I've told you all I know about " + seed.word;
      } else {

        brain.memory.short.remember(nextUntoldParable);
        _.each(nextUntoldParable.sequence, function (sequence) {

          var phrase = st.tellStoryMoment(sequence);
          response += phrase;
          response += brain.speech.softPause();

        });
      }
    } 
    else {
      _.each(story.sequence, function (moment) {

        var phrase = st.tellStoryMoment(moment);
        response += phrase;
        response += brain.speech.softPause();

     });
    }

 //   console.log('response,',response);

    return response;
  }


  st.getStoryExcerpt = function (seed) {

    var stories = brain.memory.long.getStories(seed);
    var excerpts = brain.speech.express.extractor.getRelevantMoments(stories,seed);

    var excerpt = _.sample(excerpts);

    var context = {};
    context.time = 'past';
    context.rel = 'once';
    var remark = brain.speech.express.moment(excerpt,context);
    console.log('getting story excerpt...',seed, stories);

    return remark;

    
  }

  st.tellStoryMoment = function (moment) {

    var phrase = '';
    if (!moment) return phrase;
    //console.log('tellstorymoment...',moment)
    // if (brain.memory.short.recall(moment)) return phrase;
    var context = moment.context || {};
    context.time = context.time || 'past';
    phrase = brain.speech.express.moment(moment, context);
    brain.memory.short.remember(moment);
    return phrase;
  }

}