function Brain(host) {

  var brain = this;


    brain.logic = new Logic(brain);
    brain.speech = new Speech(brain);
    brain.memory = new Memory(brain);
    brain.extractor = new Extractor(brain);
    brain.lexicon = brain.speech.lexicator;
    var lx = brain.lexicon;


  brain.process = function (words, directive) {

    var response = '';

    var idea = brain.whatIs(words);

  //  console.log('processing...',words,idea,directive)
    response = brain.ponder(idea, directive);

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

    var ideas = ex.extractIdeas(statement);

    context.ideas = ideas;

    return context;

  }

  brain.whatIs = function (word) {

    if (!word) return;

    var idea = lx.getWord(_.crack(word));
    var context = brain.analyze(word);

    return _.clone(idea);
  }


  brain.learn = function (package) {

    if (package.packageType == 'verbs') {
        brain.speech.conjugator.learn(package)
        return;
      }
      brain.speech.lexicator.learn(package);
  }


  brain.ponder = function (idea, directive) {

    if (!idea) return ["No ideas about that."];

    if (idea.see) idea = brain.whatIs(idea.see[0], true);

    var response = brain.logic.counterpose(idea,directive);

    response = brain.speech.prettify(response);

    return response;
  }
}

