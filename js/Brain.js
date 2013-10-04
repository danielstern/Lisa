function Brain(host) {

  var brain = this;


    brain.logic = new Logic(brain);
    brain.speech = new Speech(brain);
    brain.memory = new Memory(brain);
    brain.extractor = new Extractor(brain);
    brain.factory = new Factory(brain)
    brain.lexicon = brain.speech.lexicator;
    var lx = brain.lexicon;


  brain.process = function (words, directive) {

    var response = '';

    var idea = brain.whatIs(words);

    response = brain.ponder(idea, directive);

    return [response, idea];

  }

  brain.analyze = function (statement, noAsync) {

    var analysis = {};
    if (!statement) return analysis;

    var keywords = ex.keywordsFromStatement(statement);

    analysis.ideas = keywords;

    return analysis;

  }

  brain.getMomentObject = function(moment) {
    return new brain.factory.MomentObject(moment)
  }
  brain.mo = brain.getMomentObject;
  brain.MomentObject = brain.getMomentObject;

  brain.getSeed = function(seed) {
    return new brain.factory.Seed(seed)
  }
  brain.Seed = brain.getSeed

  brain.getContextObject = function(context) {
    return new brain.factory.ContextObject(context)
  }

  brain.ContextObject = brain.getContextObject;



  brain.whatIs = function (word) {

    if (!word) return;
    if (_.isObject(word)) return word;

    var idea = lx.getWord(_.crack(word));
    var analysis = brain.analyze(word);

    return _.clone(idea);
  }


  brain.learn = function (package) {

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

