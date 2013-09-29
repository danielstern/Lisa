function Brain(host) {

  var brain = this;
  brain.think = host.thinks;

  window.brain = brain; // this allows you to learn about Lisa by inspecting her brain in the console.

  brain.host = host;
  brain.lexicon = Lexicon;
  brain.personality = brain.host.personality;
  brain.mood = brain.personality;

  brain.logic = new Logic(brain);
  brain.speech = new Speech(brain);
  brain.memory = new Memory(brain);
  brain.personality = new Personality(brain);

  brain.patterns = brain.personality.patterns;
  brain.things = brain.lexicon.things;


  brain.process = function (words) {

    var response = '';

    var idea = brain.whatIs(words, true);
    response = brain.ponder(idea, true);
    console.log('returning sync...', response)
    return [response, idea];

  }

  brain.analyze = function (statement, noAsync) {

    var context = {};
    if (!statement) return context;

    context.question = 0;
    context.request = 0;

    if (_.stringContains(statement, '?')) context.question = +1;
    if (_.stringContains(statement, ' ')) context.multiword = true;
    if (_.stringContains(statement, ['would you', 'could you', 'can you', 'will you'])) {
      context.request += 1;
      context.question += 1;
    }
    if (_.stringContains(statement, ['who', 'what', 'which', 'why', 'when'])) context.request = +1;

    var ideas = _.extractIdeas(statement);

    context.ideas = ideas;

    return context;

  }

  brain.whatIs = function (word) {

    var idea = extractIdea(word);

    function extractIdea(word) {

      var idea;
      for (var i = 0; i < 2; i++) {
        idea = idea || _.find(brain.lexicon.things, function (idea) {
          if (!idea.word) return;
          return _.probably(idea.word, word, i)
        });
        idea = idea || _.find(brain.lexicon.things, function (idea) {
          if (!idea.plural) return false;
          return _.probably(idea.plural, word, i)
        });
        idea = idea || _.find(brain.lexicon.expressions, function (idea) {
          return _.probably(idea.said, word, i)
        });
      }

      for (var i = 0; i < 2; i++) {
        idea = idea || _.find(brain.lexicon.attributes, function (idea) {
          if (!idea.word) return;
          return _.probably(idea.word, word, i)
        });
        idea = idea || _.find(brain.lexicon.attributes, function (idea) {
          if (!idea.plural) return false;
          return _.probably(idea.plural, word, i)
        });
        idea = idea || _.find(brain.lexicon.expressions, function (idea) {
          return _.probably(idea.said, word, i)
        });
      }

      return idea;
    }

    var context = brain.analyze(word);

    if (context.ideas && context.ideas.length == 1) {
      idea = extractIdea(context.ideas[0]);
    }

    /*
      As a last resort, use psychic faculty to consult the internet to demystify the statement
    */
    if (brain.psychic && !idea) {

      brain.psychic.syphon(word, function (result) {
        console.log('brain got wave...', result);

      });
    }

   return idea;
  }

  brain.ponder = function (idea, useAsync) {

    var response = '';
    var promise = new Promise();

    if (brain.seed && brain.seed.hidden) brain.seed = '';

    idea = idea || brain.seed || _.sample(brain.lexicon.things);
    if (idea.hidden == 'true') _.sample(brain.lexicon.things); // this function prevents Lisa from finding out she is really a robot

    if (idea.see) idea = brain.whatIs(idea.see, true);


    var ponder = brain.logic.ponder(idea)
    response = ponder[0];
    brain.seed = ponder[1];

    response = brain.speech.prettify(response);

    return response;
  }
}