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
				pattern = _.sample(personality.patterns.classic);
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
				sequence:['demystify','compare','scopeSideways']
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
				sequence:['demystify','scopeSideways','demystify']
			},
			{
				sequence:['demystify','scopeDown','demystify']
			},
			
		],
		classic:
		[
			{
				sequence:['demystify','demystify','compare','scopeSideways']
			},
			{
				sequence:['demystify','compare','demystify']
			},
			{
				sequence:['demystify','scopeSideways','compare']
			},
			{
				sequence:['demystify','compare','scopeUp','demystify']
			},
			{
				sequence:['demystify','compare']
			},
			{
				sequence:['demystify-self','share-ego']
			},
			{
				sequence:['demystify-self','demystify-self']
			},
			{
				sequence:['demystify-self','share-ego','demystify-self']
			},
			{
				sequence:['demystify-self']
			},

			
		],

		service:
		[
			{
				sequence:['greet']
			},
			{
				sequence:['greet','demystify-self']
			},
			{
				sequence:['demystify-self','share-ego']
			},
			{
				sequence:['demystify-self','share-ego','demystify-self']
			},
			{
				sequence:['demystify-self']
			},
		],

		greeting:
		[
			{
				sequence:['greet','share-ego']
			},
		]
	}

	personality.ego = {
		identity:{
			name:'Lisa',
			profession:'spokesmatrix',
			creator:'Daniel Stern',
			language:'JavaScript',
			home:'Toronto',
		},
		qualities:[
			'smart','psychic','well-programmed','quite well-programmed',
			'dynamic','versatile','programmed with JavaScript',
			'resourceful'
		],
		relationship:[
			{subject: 'self', action:'help',object:'you',context:'present'},
			{subject: 'self', action:'kill',object:'zombies',context:'past'},
		]
	}

	personality.self = {
		word:'self',
		pronoun:'self',
	}

	personality.filter = function(string) {
		var response = string;

		switch (Math.ceil(Math.random()*50))
       {
        case 1:
          response += ", shug";
          break;
        case 2:
          response += ", sugar"
          break;
        case 3:
          response += ", hun'"
          break;
        case 4:
          response += ", honey";
          break;
        case 5:
           response = "honey, " + response;
          break;
        case 7:
          response = "well, " + response;
          break;
        case 8:
          response = "so, " + response;
          break;
        case 9:
         response = response + ", OK?";
          break;
        case 10:
         response = response + "...";
          break;
        case 11:
         response = response + ", right?";
          break;
        default:
          break;
      }

      return response;
	}
}