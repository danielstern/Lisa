var Extractor = function(brain) {
  
	var ex = this;
	window.ex = this;


  ex.seive = function(idea) {

     idea = _.clone(idea);
     var ideaParts = _.oneToMany(idea);
       ideaParts = _.map(ideaParts,function(ideaPart) {
         return _.crack(ideaPart);
     });

      return ideaParts;

  }

  ex.storyMentionsSeed = function(story, seed) {
    var storyIdeas = brain.extractor.getStoryIdeas(story);
    return _.contains(storyIdeas, seed.word) || _.contains(storyIdeas, seed.plural);
  }

  ex.occasionInvokesAttribute = function(moment, occasion) {

    var invoked = true;

    if (occasion.action) {

       if(occasion.action != moment.action) invoked = false;
    }
    if (occasion.object) {
       if(occasion.object != _.crack(moment.object)) invoked = false;
    }

    if (occasion.subject) {
       if(occasion.subject != _.crack(moment.subject)) invoked = false;
    }

    return invoked;
  },

  ex.getStoryIdeas = function (story) {

    var ideas = [];
    if (!story) return;
    var moments = ex.storyToMoments(story);
    _.each(moments,function(moment){
      ideas = ideas.concat(ex.ideasFromMoment(moment));
    });

    ideas = ex.sluice(ideas);

    return ideas;
  }


  ex.ideasFromMoment = function (moment) {

    var ideas = [];
    ideas = ideas.concat(_.values(moment));
    ideas = _.map(ideas,function(idea){
      return _.crack(idea);
    })
    return ideas;

  }

  ex.momentsFromSeed = function (seed) {


    var stories = brain.memory.long.getStories(seed);

    var ideas = ex.getStoryIdeas(stories[0])
    var story = _.sample(stories);

    if (!story) console.error("Get relevant moments error")

    var storyMoments = ex.storyToMoments(story)
    var relevantMoments = _.filter(storyMoments,function(moment){
      var ideas = ex.ideasFromMoment(moment);
      var seedProperties = _.flatten(_.values(seed))
      var intersects = _.intersection(ideas,seedProperties);
      if (intersects[0])  return true

      //return true;
    });

    return relevantMoments;

  }

  ex.storyToMoments = function(story) {

    if (!story) return console.error('no story');

    story.epic = story.epic = [];
    if (story.sequence) story.epic.push(story.sequence);

    
    var moments = _.chain(story.epic)
                   .flatten()
                   .value();

    return moments;
  }

  _.mixin();

  ex.storiesToMoments = function(stories) {
    return _.chain(stories)
             .map(function(story){return ex.storyToMoments(story)})
             .flatten()
             .value();
  }

  ex.sluice = function(ideas){

    if (ideas instanceof Array) return ex.seive(ideas) 

    return console.error('sluice dunno whats goin on');

  }

  ex.keywordsFromStatement = function(statement) {

    if (!statement) return console.warn('no statement here to extract')
    ideas = statement.split(/[\s,;.:!?'"']+/gi);
    ideas = _.map(ideas,function(idea){return idea.toString().toLowerCase()});
    ideas = _.without(ideas, '','are','is','and','of','me','with','what','without','not','generally','who','as','from','well','an','but','after','he','she','although','after','before','it','would','on','a','an','then','the','to','by','be','need','so','you','through','that','more','that’s','his','her','there','their','was','in');
    return ideas;

  }

}