ponder = function (seed, logic) {
  var response = '';   

  console.log("Ponder, ", seed)


  logic = logic || window.logic;

  seed = seed || _.sample(logic.brain.things);

  if (seed.said !== undefined) {
    response = brain.logic.colloquilize(seed);
    return [response,seed]
  }

  var pattern = brain.personality.getPattern();
  var sequence = pattern.sequence;

  _.each(sequence, function(command) {
 
    var thought;

    if (!command) return;

    console.log('Executing command:' + command);

    switch (command) {

      case 'demystify':
        thought = logic.demystify(seed);
        break;

      case 'compare':
        thought = logic.compare(seed);
        break;

      case 'express-relationship':
        thought = logic.expressRelationship(seed);
        break;

      case 'scopeUp':
        brainwave = logic.scopeUp(seed);

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

      case 'demystify-self':
        thought = logic.demystifyPersonality('self');
        break;

      case 'share-ego':
        thought = logic.shareEgo('self');
        break;

      case 'tell-story-moment':
        thought = logic.tellStoryMoment(seed);
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
       
  return [response,seed];
}