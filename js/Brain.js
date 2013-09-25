
  function Brain(host) {

    var brain = this;
    this.host = host;
    this.lexicon = Lexicon;
    this.personality = this.host.personality;
    this.mood = this.personality;
    brain.logic = new Logic(brain);
    brain.speech = new Speech(brain.host);
    brain.patterns = Patterns;
    var things = brain.lexicon.things;

    brain.process = function(words) {

      var response = '';
      var idea = brain.whatIs(words);

      if (idea)  
      {
        response += brain.ponder(idea);
      }

      return brain.speech.prettify(response) || "I don't know what that means.";

    }

    brain.whatIs = function(word) {

      brain.host.thinks('What is... ' + word)
      var idea;
      idea = _.find(brain.lexicon.things, function(idea){return idea.word.toLowerCase() == word.toLowerCase()});
        if(idea) return idea;
      
      idea = _.find(brain.lexicon.things, function(idea){if (!idea.plural) return false; return idea.plural.toLowerCase() == word.toLowerCase()});
       if(idea) return idea;

      idea = _.find(brain.lexicon.expressions, function(idea){return idea.said.toLowerCase() == word.toLowerCase()});
        if(idea) return idea;

    }



    brain.ponder = function(idea) {

      brain.host.thinks('ponder...');
      brain.seed = idea || _.sample(this.lexicon.things);
      var response = '';
      var seed = brain.seed;
      
      var logic = brain.logic;

      if (seed.said !== undefined) 
      {
         response = brain.logic.colloquilize(seed);
         return response;
      }

      var pattern = _.sample(brain.patterns.exposition);
      brain.host.thinks('Pattern...?' + pattern);
      brain.host.thinks(pattern);

      var sequence = pattern.sequence;
      _.each(sequence, function(command){
        console.log('processing command...' , command);
        switch (command)
        {
          case 'demystify':
            response = logic.demystify(brain.seed, response);
            break;
          case 'compare':
           response = logic.compare(brain.seed, response);
            break;
          case 'scopeUp':
            response = logic.scopeUp(brain.seed, response);
            break;
          case 'scopeSideways':
            response = logic.scopeSideways(brain.seed, response);
            break;
          case 'scopeDown':
            response = logic.scopeDown(brain.seed, response);
            break;
        }
      })


      response = brain.speech.prettify(response);
      return response;

    }
  }
