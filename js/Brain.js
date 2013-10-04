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

  brain.Seed = function () {

  }

  brain.ContextObject = function(context) {

   // console.log('new context object')
    context = context || {};
    this.pronoun = context.pronoun;
    this.time = context.time;

    this.pronoun = undefined;
    this.time = undefined;
    this.referenced = undefined;

    _.bind(function(thing){console.log('changed pronoun')},this.pronoun)
  }

  brain.whatIs = function (word) {

    if (!word) return;

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

