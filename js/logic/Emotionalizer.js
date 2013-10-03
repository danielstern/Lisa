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
		var fo = new FeelingsObject();
		fo.absorb(feelings);

		return fo;
	}

	em.emotionsFromStory = function(story) {
		_.log('emotions from story...',story);
		return story.emotions;

	}	

	var FeelingsObject = function() {
		var fo = this;
		fo.pleasure = 0;
		fo.excitement = 0;
		fo.pain = 0;
		fo.fear = 0;

		fo.combine = function(feeling) {
			var feelingNames = _.keys(feeling);
			_.each(feelingNames,function(feelingName) {
				fo[feelingName] = fo[feelingName] || 0;
				fo[feelingName] += feeling[feelingName];
			});
		}

		fo.absorb = function(feelings) {
			if (!feelings) return;
			if (!_.isArray(feelings)) feelings = [feelings];

			_.each(feelings, function(feeling){

					fo.combine(feeling);			

			})			
		}
	}
}