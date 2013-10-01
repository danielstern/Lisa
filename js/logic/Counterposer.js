function Counterposer (brain) {
  var cp = this;
  cp.counterpose = function (seed,logic,directive) {
    
    var logic = brain.logic;
    var response = '';   

    logic = logic || window.logic;

    if (!seed) return [brain.speech.express.incomprehension()];

    // If the seed is a saying, reply appropriately, i.e., << Good morning <:> How do you do? >>.
    if (seed.said !== undefined) {
      response = brain.logic.colloquilize(seed);
      return [response,seed]
    }

    var sequence = directive ? [directive] : _.sample(brain.patterns);

    _.each(sequence, function(command) {
   
      var thought;

      if (!command) return;


      switch (command) {

        case 'scopeUp': 
        case 'scope-up':
          brainwave = logic.scopeUp(seed);
          console.log('doing scopeup',brainwave);

           thought = brainwave[0];
          seed = brainwave[1];
          break;

        case 'scopeSideways':
          brainwave = logic.scopeSideways(seed); 
          thought = brainwave[0];
          seed = brainwave[1];
          break;

        case 'scopeDown':
          brainwave = logic.scopeDown(seed);
          thought = brainwave[0];
          seed = brainwave[1];
          break;

        case 'greet':
          thought = brain.speech.express.formalGreeting();
          break;

        case 'draw-conclusion':
          thought = logic.drawConclusion(seed);
          break;

        case 'tell-story':
          thought = logic.tellStory(seed);
          break;
      }

      var shortTerm = brain.memory.short;
      var alreadySaidIt = false;

      if (!shortTerm.recall(thought)) {
        response += thought;
        response += brain.speech.softPause();
        shortTerm.remember(thought);
      } 
      else {
        response += brain.speech.express.pause();
        response += brain.speech.softPause();
      }
     
    })

    if (!response)   response = brain.speech.softPause();     
    return [response,seed];
  }
}