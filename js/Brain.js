
  function Brain(host) {

    var brain = this;
    brain.host = host;
    brain.lexicon = Lexicon;
    brain.personality = brain.host.personality;
    brain.mood = brain.personality;
    
    brain.logic = new Logic(brain);
    brain.speech = new Speech(brain.host);
    brain.memory = new Memory(brain);

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

        var thought;
        switch (command)
        {
          case 'demystify':
            thought = logic.demystify(brain.seed);
            break;
          case 'compare':
           thought = logic.compare(brain.seed);
            break;
          case 'scopeUp':
           thought = logic.scopeUp(brain.seed);
            break;
          case 'scopeSideways':
          thought = logic.scopeSideways(brain.seed);
           break;
          case 'scopeDown':
           thought = logic.scopeDown(brain.seed);
            break;
        }


        var shortTerm = brain.memory.short;
        var alreadySaidIt = false;
        if (shortTerm.recall(thought)) {
          brain.host.thinks('Oh, I just said that, didn\'t I...!');
          alreadySaidIt = true;
        };
        if (!alreadySaidIt) {
          response += thought;
          shortTerm.remember(thought);
        } else {

          response += "hmmm..//"
        }
         
      })

      response = brain.speech.prettify(response);
      
      setTimeout(function(){promise.resolve(response)},150);
      return promise;
    }
  }


function Memory(brain) {

  var memory = this;
  memory.brain = brain;
  memory.short = new ShortTermMemory(memory);

}

function ShortTermMemory(memory) {

  var short = this;
  short.memory = memory;
  short.capacity = 25;

  short.recentThings = [];

  short.remember = function(memory) {
    console.log('got memory...',memory);
    short.recentThings.push(memory);
  }

  short.recall = function(memory) {
    var justNow = _.last(short.recentThings,short.capacity)
    var contains = _.contains(justNow, memory);
    console.log('contains?',contains);
    return contains;
  }

  window.mem = this;
}