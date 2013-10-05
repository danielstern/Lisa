define("logic/Counterposer", [], function () {

  return function Counterposer(brain) {

    var cp = this;
    cp.counterpose = function (seed, directive) {

      var logic = brain.logic;
      var response = '';

      if(!seed) return "I... uh... can't think of anything."

      if(seed.said !== undefined) {
        response = brain.logic.colloquilize(seed);
        return [response, seed]
      }

      if(!directive) return console.error('No directive');

      switch(directive) {

      case 'story-excerpt':
        thought = logic.getStoryExcerpt(seed);
        break;;

      case 'tell-story':
        thought = logic.tellStory(seed);
        break;

      case 'emote':
        thought = logic.emote(seed);
        break;

      case 'express-inheritance':
        thought = logic.expressInheritance(seed);
        break;

      }

      response += thought;
      response += brain.speech.softPause();

      return response;
    }
  }
})