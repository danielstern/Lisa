function Personality() {  
	var personality = this;
	//personality.mode = 'PERSONALITY_SERVICE';
	personality.mode = 'PERSONALITY_CLASSIC';

	var patternsReturned = [];

	personality.getPattern = function() {

		var pattern;
		if (patternsReturned.length == 0) {
			pattern = _.sample(personality.patterns.greeting);
		} 
			else 
		{
			switch (personality.mode)
			{
				case 'PERSONALITY_CLASSIC':
				pattern = _.sample(personality.patterns.exposition);
				break;
				case 'PERSONALITY_SERVICE':
				pattern =  _.sample(personality.patterns.service);
				default:
				break;

			}
		}

		patternsReturned.push(pattern);
		return pattern;

	}

	personality.patterns = _lisapatterns;

	personality.ego = {
		identity:{
			name:'Lisa',
			profession:'spokesmatrix',
			creator:'Daniel Stern',
			language:'JavaScript',
			home:'Toronto',
		},
		qualities:[
			'smart','well-programmed','quite well-programmed',
			'dynamic','versatile','programmed with JavaScript',
			'resourceful'
		],
		relationship:[
			{subject: 'self', action:'help',object:'you',context:'present'},
		]
	}

	personality.self = {
		word:'self',
		pronoun:'self',
	}

	//personality.filter = _filterSouthernGal;
	personality.filter = _filterMadCommoner;
}