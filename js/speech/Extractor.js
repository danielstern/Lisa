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

  ex.extractStory = function (story) {

    var ideas = [];
    if (!story) return;
    var moments = ex.storyToMoments(story);
    _.each(moments,function(moment){
      ideas = ideas.concat(ex.ideasFromMoment(moment));
    });

    ideas = ex.sluice(ideas);
    //console.log('Extract Story',story,ideas)

   // console.log('extractStory,',story,ideas)

    return ideas;
  }

  ex.occasionsFromMoments = function (moments) {


    if (!moments instanceof Array) moments = [moments];

    var lx = brain.speech.lexicator;
    var attributes = lx.getAllAttributes();
    var occasions = [];
 _.each(moments,function(moment){
    occasions.concat(_.filter(attributes, function(attribute) {
      _.each(attribute.when, function (occasion) {
        occasion.applies = occasion.applies || 'subject';
        if(ex.occasionInvokesAttribute(moment, occasion)) return true;

      })
    }));
  })
    return occasions;
  }

  ex.occasionsFromMoment = ex.occasionsFromMoments;

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

    var ideas = ex.extractStory(stories[0])
    var story = _.sample(stories);

    if (!story) console.error("Get relevant moments error")

    var storyMoments = ex.storyToMoments(story)
    var relevantMoments = _.filter(storyMoments,function(moment){
      var ideas = ex.ideasFromMoment(moment);
      var seedProperties = _.flatten(_.values(seed))
      var intersects = _.intersection(ideas,seedProperties);
      if (intersects[0]) {

        return true;
      }

      //return true;
    });

    return relevantMoments;

  }

  ex.storyToMoments = function(story) {
    var moments = [];

    if (!story) return moments;

    if (_.has(story, 'epic')) {
        _.each(story.epic, function(parable) {
          _.each(parable.sequence, function(moment) {
              moments.push(moment);     
            });
        });
    }

    _.each(story.sequence, function(moment) {
      moments.push(moment);
    });
    //console.log('storyMoments...',story,moments);

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

    var newIdeas = [];

    if (ideas instanceof Array) return ex.seive(ideas);

     _.each(ideas,function(idea){

       _.concat(newIdeas, ex.seive(idea))

    });


    return newIdeas;
  }

  ex.extractIdeas = function(statement) {

    statement = statement || '';
    ideas = statement.split(/[\s,;.:!?'"']+/);
    ideas = _.map(ideas,function(idea){return idea.toString().toLowerCase()});
    ideas = _.without(ideas, '','are','is','and','of','me','with','what','without','not','generally','who','as','from','well','an','but','after','he','she','although','after','before','it','would','on','a','an','then','the','to','by','be','need','so','you','through','that','more','that’s','his','her','there','their','was','in');
    return ideas;

  }

}