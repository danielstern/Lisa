function Brain(host) {

  var brain = this;
  brain.think = host.thinks;
  
  window.brain = brain; // this allows you to learn about Lisa by inspecting her brain in the console.

  brain.host = host;
  brain.lexicon = Lexicon;
  brain.personality = brain.host.personality;
  brain.mood = brain.personality;
  
  brain.logic = new Logic(brain);
  brain.speech = new Speech(brain.host);
  brain.memory = new Memory(brain);
  brain.personality = new Personality(brain);

  brain.patterns = brain.personality.patterns;
  brain.things = brain.lexicon.things;


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

    context.ideas = ideas;

    return context;

  }

  brain.whatIs = function(word, noAsync) {

    var idea;


    // try to look the idea up in her Lexicon
    idea = _.find(brain.lexicon.things, function(idea){if (!idea.word) return; return idea.word.toLowerCase() == word.toLowerCase()});      
    idea = idea || _.find(brain.lexicon.things, function(idea){if (!idea.plural) return false; return idea.plural.toLowerCase() == word.toLowerCase()});
    idea = idea || _.find(brain.lexicon.expressions, function(idea){return idea.said.toLowerCase() == word.toLowerCase()});

    var context = brain.analyze(word);

    /*
      glitchy idea matching matches "King of Swedes" to "king" or "Sword of the Morning" to 'sword'
    if (!idea)
    {
      _.each(context.ideas,function(thoughtFragment){
         idea = idea || _.find(brain.lexicon.things, function(idea){return idea.word.toLowerCase() == thoughtFragment.toLowerCase()});      
         idea = idea || _.find(brain.lexicon.things, function(idea){if (!idea.plural) return false; return idea.plural.toLowerCase() == thoughtFragment.toLowerCase()});
         idea = idea || _.find(brain.lexicon.expressions, function(idea){return idea.said.toLowerCase() == thoughtFragment.toLowerCase()});
      });
    }
    */

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

    var response = '';
    var promise = new Promise();

    if (brain.seed && brain.seed.hidden) brain.seed = '';
    
    idea = idea || brain.seed || _.sample(brain.lexicon.things);
    if (idea.hidden == 'true') _.sample(brain.lexicon.things); // this function prevents Lisa from finding out she is really a robot

    if (idea.see) idea = brain.whatIs(idea.see,true);


    var ponder = brain.logic.ponder(idea)
    response = ponder[0];
    brain.seed = ponder[1];

    response = brain.speech.prettify(response);
    
    setTimeout(function(){promise.resolve(response)},50);
    return promise;
  }
}

