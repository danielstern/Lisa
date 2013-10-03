function Emotionalizer(brain) {

	var em = this;
	em.getEmotionalRemark = function(seed) {
		if (!seed) return;

		var stories = ex.storiesFromSeed(seed);
		var allFeelings = _.map(stories, function(story) {
			var emotions = em.emotionsFromStory(story);
			return emotions;
		});
		var fo = em.objectFromFeelings(allFeelings);
	//	console.log('Get emotional remark...',stories,fo);
		var remark = em.expressFeelingsObject(fo,seed);
		return remark;


	}

	em.expressFeelingsObject = function(fo,seed) {

		var overallFeelings = fo.getOverallFeeling();
		console.log('expressing feelings',seed,fo, overallFeelings);;

		if (_.between(overallFeelings,-10,10)) return "I don't feel strongly about " + (seed.plural || seed.word);
		if (_.below(overallFeelings,-10)) return "I don't like " + (seed.plural || seed.word);
		if (_.above(overallFeelings,10)) return "I like " + (seed.plural || seed.word);

		return "Idunno."

	}

	em.objectFromFeelings = function(feelings) {
		var fo = new FeelingsObject();
		fo.absorb(feelings);

		return fo;
	}

	em.emotionsFromStory = function(story) {
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

		fo.getOverallFeeling = function() {
			var feeling = 0;
			feeling += fo.pleasure * 2;
			feeling += fo.excitement * 1;
			feeling -= fo.pain * 3;
			feeling -= fo.fear * 2;

			return feeling;
		}
	}
}