
  function Brain(host) {

    var brain = this;
    brain.host = host;
    brain.lexicon = Lexicon;
    brain.personality = brain.host.personality;
    brain.mood = brain.personality;
    
    brain.logic = new Logic(brain);
    brain.speech = new Speech(brain.host);
    brain.memory = new Memory(brain);
    brain.personality = new Personality(brain);

    console.log('personality?' , brain.personality)

    brain.patterns = personality.patterns;
    var things = brain.lexicon.things;
   // brain.psychic = new Psychic();

    brain.process = function(words) {

      var response = '';
      var _callback = {};
      var promise = new Promise(_callback);

      brain.whatIs(words).then(
        function(idea){
          if (!idea) {
            promise.resolve(brain.speech.express.incomprehension());
            return;
          }
           brain.ponder(idea).then(
        function(response){
          promise.resolve(response);
        });
      })

      return promise;


    }

    brain.analyze = function(statement, noAsync) {

      var context = {};
      if (!statement) return context;

      context.question = 0;
      context.request = 0;

      if (_.stringContains(statement,'?')) context.question = +1;
      if (_.stringContains(statement,' ')) context.multiword = true;
      if (_.stringContains(statement,['would you','could you','can you','will you'])) { context.request += 1; context.question += 1 ;}
      if (_.stringContains(statement,['who','what','which','why','when'])) context.request = +1;

      var ideas = _.extractIdeas(statement);
      console.log('ideas?',ideas);

      context.ideas = ideas;

      return context;

    }

    brain.whatIs = function(word, noAsync) {

      brain.host.thinks('What is... ' + word);
      var idea;

      // try to look the idea up in her Lexicon
      idea = _.find(brain.lexicon.things, function(idea){return idea.word.toLowerCase() == word.toLowerCase()});      
      idea = idea || _.find(brain.lexicon.things, function(idea){if (!idea.plural) return false; return idea.plural.toLowerCase() == word.toLowerCase()});
      idea = idea || _.find(brain.lexicon.expressions, function(idea){return idea.said.toLowerCase() == word.toLowerCase()});

      var context = brain.analyze(word);

      if (!idea)
      {
        _.each(context.ideas,function(thoughtFragment){
           idea = idea || _.find(brain.lexicon.things, function(idea){return idea.word.toLowerCase() == thoughtFragment.toLowerCase()});      
           idea = idea || _.find(brain.lexicon.things, function(idea){if (!idea.plural) return false; return idea.plural.toLowerCase() == thoughtFragment.toLowerCase()});
           idea = idea || _.find(brain.lexicon.expressions, function(idea){return idea.said.toLowerCase() == thoughtFragment.toLowerCase()});
        });
      }

      /*
        As a last resort, use psychic faculty to consult the internet to demystify the statement
      */
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


      if (seed.said !== undefined) // see if seed is an expression
      {
         response = brain.logic.colloquilize(seed);
         response = brain.speech.prettify(response);
         setTimeout(function(){promise.resolve(response)},150);
         return promise;
      }

      var pattern = [];
      console.log('mode?' , brain.personality.mode);
      pattern = [];
      if (brain.personality.mode == 'PERSONALITY_SERVICE') {
        console.log('patterns?',brain.personality.patterns);
        pattern = _.sample(brain.personality.patterns.service) 
      } else
      {
        pattern = _.sample(brain.personality.patterns.exposition)
      };

      var sequence = pattern.sequence;
        console.log('sequence?',sequence);
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
          case 'greet':
           thought = brain.speech.express.formalGreeting();
            break;
          case 'demystify-self':
           thought = logic.demystifyPersonality('self');
            break;

        }


        var shortTerm = brain.memory.short;
        var alreadySaidIt = false;
        if (shortTerm.recall(thought)) {
          brain.host.thinks('Oh, I just said that, didn\'t I...');
          alreadySaidIt = true;
        };
        if (!alreadySaidIt) {
          response += thought;
          shortTerm.remember(thought);
        } else {

          response += brain.speech.express.pause();
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