function Personality() {  
	var personality = this;
	//personality.mode = 'PERSONALITY_SERVICE';
	personality.mode = 'PERSONALITY_CLASSIC';

	personality.getPattern = function() {
		switch (personality.mode)
		{
			case 'PERSONALITY_CLASSIC':
			return _.sample(personality.patterns.exposition);
			break;
			case 'PERSONALITY_SERVICE':
			return  _.sample(personality.patterns.service);

		}

	}

	personality.patterns = {
		exposition:
		[
			{
				sequence:['demystify','demystify','compare']
			},
			{
				sequence:['demystify','compare','demystify']
			},
			{
				sequence:['demystify','compare','compare']
			},
			{
				sequence:['demystify','compare','scopeUp','demystify']
			},
			{
				sequence:['demystify','compare']
			},
			{
				sequence:['demystify','demystify']
			},
			{
				sequence:['demystify','scopeSideways','demystify','scopeUp']
			},
			{
				sequence:['demystify','scopeDown','demystify']
			},
			{
				sequence:['demystify-self','demystify','scopeDown','demystify']
			}
		],

		service:
		[
			{
				sequence:['greet']
			},
			{
				sequence:['greet','demystify-self']
			}
		]
	}

	personality.ego = {
		identity:{
			name:'Lisa',
			profession:'spokesmatrix',
			creator:'Daniel Stern',
			language:'JavaScript'
		}
	}

	personality.self = {
		word:'self',
		pronoun:'self',
	}
}