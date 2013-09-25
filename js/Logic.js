function Logic(brain) {

	var logic = this;
	   var things = brain.lexicon.things;

	  logic.demystify = function (seed, response)
      {
         if (!seed.is) return response;
         response += brain.speech.express.quality(seed, _.sample(seed.is));
         response += "//";
         
         return response;
      }

      logic.scopeUp = function(seed, response) 
      {
         if (!seed.extends) return response;

         response += brain.speech.express.inheritance(seed, seed.extends);
         response += "//";

         var scopeUpIdea = _.where(things,{word:seed.extends[0]});
         if (scopeUpIdea[0]) brain.seed = scopeUpIdea[0];
         return response; 
      }

      logic.scopeDown = function(seed, response) 
      {
          var scopeDownIdea = _.filter(things,function(thing){
            if (!thing.extends) return false;
            if (thing.word == seed.word) return false;
            if (thing.extends[0] == seed.word) return true;
            return false;
          })
          if (!scopeDownIdea) return response;

          brain.host.thinks("I am scoping down.");  
            
         if (scopeDownIdea[0]) {
          var idea = _.sample(scopeDownIdea);
          brain.seed = idea;
          response += brain.speech.express.induction(seed, idea);
          response += "//";
         }
         return response;
      }

      /* compare 
         find something that shares a trait with the idea's seed
      */

      logic.compare = function(seed,response)
      {
        for (var i = 0; i < brain.mood.inquisitive; i++)
        {
           var trait = _.sample(seed.is);
           var thing = _.sample(things);

           if(_.contains(thing.is, trait) && thing.word != seed.word) 
           {
             response += brain.speech.express.sharedQuality(seed, thing, trait);
             response += "//";
             return response;
           }
        }
        return response;
      }

      logic.scopeSideways = function (seed, response)
      {
        if (!seed.extends) return response;
        var relatedThings = _.filter(brain.lexicon.things, function(thing){
          if (!thing.extends) return false;
          if (thing.word == seed.word) return false;
          return thing.extends[0] == seed.extends[0]
        });

        if (!relatedThings) return response;
        var sidewaysIdea = _.sample(relatedThings);
        if (!sidewaysIdea) return response;
        response += brain.speech.express.association(seed,sidewaysIdea);
        response += "//";
        brain.seed = sidewaysIdea;

        return response;

      }

      logic.colloquilize = function(seed) 
      {
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
      	 }
      }

}