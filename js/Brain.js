function Brain(host) {

  var brain = this;
  window.brain = brain; // this allows you to learn about Lisa by inspecting her brain in the console.
  brain.host = host;
  brain.lexicon = Lexicon;

  brain.logic = new Logic(brain);
  brain.speech = new Speech(brain);
  brain.memory = new Memory(brain);

  brain.patterns = [
    ['tell-story']
  ];

  brain.process = function (words) {

    var response = '';

    var idea = brain.whatIs(words, true);
    response = brain.ponder(idea, true);

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

    var idea = extractIdea(_.crack(word));

    var context = brain.analyze(word);

    if (context.ideas && context.ideas.length == 1) {
      idea = extractIdea(_.sample(context.ideas));
    }

    //console.log('What is: ', word, idea, context);


    return _.clone(idea);
  }

  brain.ponder = function (idea) {

    var response = '';

    if (brain.seed && brain.seed.hidden) brain.seed = '';

    // what was passed, or what the brain was thinking about last, or something random
    idea = idea || brain.seed || _.sample(brain.lexicon.things);
    if (idea.hidden == 'true') _.sample(brain.lexicon.things);

    if (idea && idea.see) idea = brain.whatIs(idea.see[0], true);

    var ponder = brain.logic.counterpose(idea)
    response = ponder[0];
    brain.seed = ponder[1];

    // console.log('Ponder',idea,response)
    if (!response) response = brain.speech.express.pause();

    response = brain.speech.prettify(response);

    return response;
  }

}

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