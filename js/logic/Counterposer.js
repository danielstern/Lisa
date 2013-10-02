function Counterposer(brain) {
  var cp = this;
  cp.counterpose = function (seed, directive) {

    var logic = brain.logic;
    var response = '';

    if(!seed) console.error('no seed');

    if(seed.said !== undefined) {
      response = brain.logic.colloquilize(seed);
      return [response, seed]
    }

    var sequence = [directive];

    _.each(sequence, function (command) {

      var thought;

      if(!command) return;

      switch(command) {

      case 'story-excerpt':
        thought = logic.getStoryExcerpt(seed);
        break;

      case 'draw-conclusion':
        thought = logic.drawConclusion(seed);
        break;

      case 'tell-story':
        thought = logic.tellStory(seed);
        break;

      }

      var shortTerm = brain.memory.short;

      response += thought;
      response += brain.speech.softPause();
      shortTerm.remember(thought);

    })

    if(!response) response = brain.speech.softPause();

    return [response];
  }
}