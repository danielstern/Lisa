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

    var command = directive;
//    if(!command) return;

      switch(command) {

      case 'story-excerpt':
        thought = logic.getStoryExcerpt(seed);
        break;;

      case 'tell-story':
        thought = logic.tellStory(seed);
        break;

      }

      response += thought;
      response += brain.speech.softPause();


    return response;
  }
}