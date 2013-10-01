var Extractor = function(brain) {
	console.log("extractor initialized", brain);
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

  ex.extractStory = function (story) {

    var ideas = [];
    if (!story) return ideas;
    if (_.has(story, 'epic')) {

        _.each(story.epic, function(parable) {

          _.each(parable.sequence, function(moment) {

     //        console.log('extract story',story,ideas,moment)
            ideas = ideas.concat(_.values(moment));
       
            });

        });
    }

    _.each(story.sequence, function(moment) {


      ideas = ideas.concat(_.values(moment));
     
    });

    ideas = ex.sluice(ideas);
    //console.log('Extract Story',story,ideas)

    return ideas;
  }

  ex.sluice = function(ideas){

    var newIdeas = [];

    if (ideas instanceof Array) return ex.seive(ideas);

     _.each(ideas,function(idea){

       _.concat(newIdeas, ex.seive(idea))

    });


    return newIdeas;
  }

}