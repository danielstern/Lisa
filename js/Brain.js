
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
   // brain.psychic = new Psychic();

    brain.process = function(words) {

      var response = '';
      var _callback = {};
      var promise = new Promise(_callback);

      brain.whatIs(words).then(
        function(idea){
           brain.ponder(idea).then(
        function(response){
          promise.resolve(response);
        });
      })

      return promise;


    }

    brain.whatIs = function(word, noAsync) {

      brain.host.thinks('What is... ' + word)
      var idea;
      idea = _.find(brain.lexicon.things, function(idea){return idea.word.toLowerCase() == word.toLowerCase()});

      
      idea = idea || _.find(brain.lexicon.things, function(idea){if (!idea.plural) return false; return idea.plural.toLowerCase() == word.toLowerCase()});
      idea = idea || _.find(brain.lexicon.expressions, function(idea){return idea.said.toLowerCase() == word.toLowerCase()});

      if (brain.psychic && !idea) {

        brain.psychic.syphon(word, function(result){

          console.log('brain got wave...',result);

        });

      }

      if (noAsync) return idea;

      var promise = new Promise();
      setTimeout(function(){promise.resolve(idea)},100);
      return promise;
    }



    brain.ponder = function(idea) {

      brain.seed = idea || _.sample(this.lexicon.things);
      var response = '';
      var seed = brain.seed;
      var promise = new Promise();
      
      var logic = brain.logic;


      if (seed.said !== undefined) 
      {
         response = brain.logic.colloquilize(seed);
         response = brain.speech.prettify(response);
         setTimeout(function(){promise.resolve(response)},150);
         return promise;
      }

      var pattern = _.sample(brain.patterns.exposition);
      brain.host.thinks(pattern);

      var sequence = pattern.sequence;
      _.each(sequence, function(command){

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

      
      setTimeout(function(){promise.resolve(response)},150);
      return promise;
    }
  }
