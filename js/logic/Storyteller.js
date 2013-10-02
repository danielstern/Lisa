var Storyteller = function(brain) {
	var st = this;


	st.tellStory = function (seed) {

   	var response = '';

    stories = brain.memory.long.getStories(seed);
    
    var story = _.sample(stories);
    var shortTerm = brain.memory.short;
    if (!story) return "No stories about that.";

    var parable; 

    if (_.has(story, 'epic')) {

      parable = _.find(story.epic, function (parable) {return !shortTerm.recall(parable)});    

    }

    parable = parable || story;
    
    _.each(parable.sequence, function (moment) {

      var phrase = st.tellStoryMoment(moment);
      response += phrase;
      response += brain.speech.softPause();

     });

    return response;
  }


  st.getStoryExcerpt = function (seed) {

    var excerpts = brain.extractor.momentsFromSeed(seed);

    var excerpt = _.sample(excerpts);

    var context = {};
    context.time = 'past';
    context.rel = 'once';
    var remark = brain.speech.express.moment(excerpt,context);

    return remark;

    
  }

  st.tellStoryMoment = function (moment) {

    var phrase = '';
    if (!moment) return phrase;
    var context = moment.context || {};
    context.time = context.time || 'past';
    phrase = brain.speech.momento.moment(moment, context);
    brain.memory.short.remember(moment);
    return phrase;
  }

}