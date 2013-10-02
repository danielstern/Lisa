function Counterposer (brain) {
  var cp = this;
  cp.counterpose = function (seed,directive) {
    
    var logic = brain.logic;
    var response = '';   

    if (!seed) return ["No seed"];

    // If the seed is a saying, reply appropriately, i.e., << Good morning <:> How do you do? >>.
    if (seed.said !== undefined) {
      response = brain.logic.colloquilize(seed);
      return [response,seed]
    }

    console.log('Counterposing...',seed,directive)

//    var sequence = directive ? [directive] : _.sample(brain.patterns);
    var sequence = [directive];

    _.each(sequence, function(command) {
   
      var thought;

    //  console.log('Executing command...',command)

      if (!command) return;


      switch (command) {

        case 'greet':
          thought = brain.speech.express.formalGreeting();
          break;

        case 'story-excerpt':
          thought = logic.getStoryExcerpt(seed);
          break;


        case 'draw-conclusion':
          thought = logic.drawConclusion(seed);
          break;

        case 'tell-story':
          thought = logic.tellStory(seed);
          break;

        case 'demystify':
          thought = logic.tellStory(seed);
          break;
      }

      var shortTerm = brain.memory.short;

              response += thought;
        response += brain.speech.softPause();
        shortTerm.remember(thought);

    /*  if (!shortTerm.recall(thought)) {
        response += thought;
        response += brain.speech.softPause();
        shortTerm.remember(thought);
      } 
      else {
        response += brain.speech.express.pause();
        response += brain.speech.softPause();
      }*/
     
    })

    if (!response)   response = brain.speech.softPause();     


    console.log('Counterpose retunring...',response)
    return [response];
  }
}