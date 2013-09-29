function Personality() {  
	var personality = this;

	var patternsReturned = [];

	personality.getPattern = function() {

		var pattern;
		   pattern = _.sample(personality.patterns.exposition);
		   /*
		if (patternsReturned.length == 0) {
			pattern = _.sample(personality.patterns.greeting);
		} 
			else 
		{
		    pattern = _.sample(personality.patterns.exposition);
		}*/

		patternsReturned.push(pattern);
		return pattern;

	}

	personality.patterns = _lisapatterns;

	// personality.filter = _filterSouthernGal;
	personality.filter = new _filterMadCommoner();
}