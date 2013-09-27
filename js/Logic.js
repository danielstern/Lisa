function Logic(brain) {

	var logic = this;
  var things = brain.lexicon.things;
  var think = brain.host.thinks;

  logic.demystify = function (seed, numberOfQualities) {
     var response = '';
     if (!seed.is) return response;

     response += brain.speech.express.quality(seed, _.sample(seed.is));
     response += brain.speech.softPause();
     
     return response;
  }

  logic.ponder = function (seed) {
    var response = '';   


    if (seed.said !== undefined) {
      response = brain.logic.colloquilize(seed);
      response = brain.speech.prettify(response);
      setTimeout(function(){promise.resolve(response)},150);
      return promise;
    }

    var pattern = brain.personality.getPattern();
    var sequence = pattern.sequence;

    _.each(sequence, function(command) {
   
      var thought;

      switch (command) {

        case 'demystify':
          thought = logic.demystify(seed);
          break;

        case 'compare':
          thought = logic.compare(seed);
          break;

        case 'scopeUp':
          thought = logic.scopeUp(seed);
          break;

        case 'scopeSideways':
          brainwave = logic.scopeSideways(seed)[0];
          thought = brainwave[0];
          seed = brainwave[1];
          break;

        case 'scopeDown':
          thought = logic.scopeDown(seed);
          break;


        case 'greet':
          thought = brain.speech.express.formalGreeting();
          break;

        case 'demystify-self':
          thought = logic.demystifyPersonality('self');
          break;

        case 'share-ego':
          thought = logic.shareEgo('self');
          break;
      }

      var shortTerm = brain.memory.short;
      var alreadySaidIt = false;

      if (!shortTerm.recall(thought)) {
        response += thought;
        response += "//";
        shortTerm.remember(thought);
      } 
      else {
        response += brain.speech.express.pause();
      }
     
    })
         
    return response;
  }

  logic.demystifyPersonality = function (being) {

    var response = '';
    being = being || 'self';

    var quality ;
    var relationship;

    switch (Math.ceil(Math.random()*2)) {
    case 1:
      quality = _.sample(brain.personality.ego.qualities);
      response += brain.speech.express.personalTrait(quality);
      break;
    case 2:
      relationship = _.sample(brain.personality.ego.relationship);
      response += brain.speech.express.relationship(relationship);
      break;
    }

    response += brain.speech.softPause();
    return response;
  }

  logic.shareEgo = function (being) {

    var response = '';
    being = being || 'self';

    var traits = _.pairs(brain.personality.ego.identity);
    var trait;

    if (!brain.memory.short.scan(brain.personality.ego.identity.name)) {
       think('I havent even told you my name yet.');
       trait = _.find(traits,function(trait){return trait[0] == 'name'});
    }
  
    trait = trait || _.sample(traits);
  
    response += brain.speech.express.possessive(trait[0], trait[1]);
    response += brain.speech.softPause();

    return response;
  }

  logic.scopeUp = function(seed) {
     var response = '';
     if (!seed.extends) return response;

     response += brain.speech.express.inheritance(seed, seed.extends);
     response += brain.speech.softPause();

     var scopeUpIdea = _.where(things,{word:seed.extends[0]});
     if (!scopeUpIdea[0]) think('I cant scope up to ' + seed.extends[0]);
     if (scopeUpIdea[0]) seed = scopeUpIdea[0];
     return response; 
  }

  logic.scopeDown = function(seed) {
    var response = '';

    var scopeDownIdea = _.filter(things,function(thing) {
      if (!thing.extends) return false;
      if (thing.word == seed.word) return false;
      if (thing.extends[0] == seed.word) return true;
      return false;
    })

    if (!scopeDownIdea) return response;
      
    if (scopeDownIdea[0]) {
      var idea = _.sample(scopeDownIdea);
      seed = idea;
      response += brain.speech.express.induction(seed, idea);
      response += brain.speech.softPause();
    }

    return response;
  }


  /* compare 
     find something that shares a trait with the idea's seed
  */

  logic.compare = function(seed) {

    var response = '';

    if (!seed.is) return response;

    for (var i = 0; i < brain.mood.inquisitive; i++)
    {
       var trait = _.sample(seed.is);
       var thing = _.sample(things);

       if(_.contains(thing.is, trait) && thing.word != seed.word) 
       {
         response += brain.speech.express.sharedQuality(seed, thing, trait);
         response += brain.speech.softPause();
         return response;
       }
    }

    return response;
  }

  logic.scopeSideways = function (seed) {

    var response = '';

    think("I'm trying to scope sideways!",seed);

    if (!seed.extends) return [response,seed];
    var relatedThings = _.filter(brain.lexicon.things, function(thing){
      if (!thing.extends) return false;
      if (thing.word == seed.word) return false;
      return thing.extends[0] == seed.extends[0]
    });

    if (!relatedThings) return [response,seed];

    think('there are related things.')
    var sidewaysIdea = _.sample(relatedThings);

    if (!sidewaysIdea) return [response,seed];

    think('there is a sideways idea.')
    
    response += brain.speech.express.association(seed,sidewaysIdea);
    response += brain.speech.softPause();
    seed = sidewaysIdea;
    
    think('returning',response,seed);

    return [response,seed];
  }

  /*
  Induct
  consider a seed(A) scopeUp (to B), demystify, and then conclude that A must also have that property because A is B.
  */

  /*
  Contrast
  note how two things share a trait do not share a like trait
  */

  /*
  Colliquilize: use cultural knowledge to reply appropriately.
  */
  logic.colloquilize = function(seed) {

    console.log('colloquilize');
    switch (seed.for) {
    	case 'greeting':
    	  return brain.speech.express.greeting();
    	  break;
    	case 'silence':
    	  brain.host.thinks('Silence?');
    	  return brain.speech.express.perceiveSilence();
    	  break;
    	case 'insult':
    	  brain.host.thinks('How dare you!');
    	  return brain.speech.express.offense();
    	  break;
    	case 'parting':
    	  return brain.speech.express.parting();
    	  break;
    }
  }
}