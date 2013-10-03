function Emotionalizer(brain) {

	var em = this;
	em.getEmotionalRemark = function(seed) {
		if (!seed) return;

		var stories = ex.storiesFromSeed(seed);
		console.log('Get Emotional remark...',seed,stories);
		var allFeelings = _.map(stories, function(story) {
			var emotions = em.emotionsFromStory(story);
			return emotions;
		});
		var fo = em.objectFromFeelings(allFeelings);
		console.log('got emotions...',fo);


	}

	em.objectFromFeelings = function(feelings) {
		var fo = new em.FeelingsObject();
		_.each(feelings, function(feeling){

			var feelingNames = _.keys(feeling);
			_.each(feelingNames,function(feelingName) {
				fo[feelingName] = fo[feelingName] || 0;
				fo[feelingName] += feeling[feelingName];
			});

	})
		return fo;
	}

	em.emotionsFromStory = function(story) {
		_.log('emotions from story...',story);
		return story.emotions;

	}	

	em.FeelingsObject = function() {
		var fo = this;
		fo.pleasure = 0;
		fo.excitement = 0;
		fo.pain = 0;
		fo.fear = 0;
	}
}