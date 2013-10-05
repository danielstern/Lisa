define("Brain", ["Memory","speech/Speech","logic/Logic","Extractor","Factory"], function (Memory, Speech, Logic, Extractor, Factory) {

  return function Brain(lisa) {
    
    var brain = this;
    var lx;

    brain.init = function() {

      brain.memory = new Memory(brain);
      brain.speech = new Speech(brain);
      brain.logic = new Logic(brain);
      brain.extractor = new Extractor(brain);
      brain.factory = new Factory(brain);
      brain.lexicon = brain.speech.lexicator;

      brain.mo = brain.getMomentObject;
      brain.MomentObject = brain.getMomentObject;
      brain.ContextObject = brain.getContextObject;
      brain.PrepositionObject = brain.factory.PrepositionObject;
      brain.Seed = brain.getSeed

      lx = brain.lexicon;

      return true;
  }

    var speed = _.sample(_.range(5,7));
    var frequency = 10000/speed;

    var cyclesActive = 0;
    brain.start = function() {
      setInterval(function(){
        cyclesActive += 1;
        lisa.output(brain.cycle());
      },frequency)


    }

    brain.getDefaultSeed = function() {
      return brain.speech.lexicator.getRandomWord();
    }

    brain.getDefaultDirective = function() {
      var directives = ['express-inheritance','story-excerpt','emote','tell-story']
      return _.sample(directives);
    }

    brain.cycle = function() {
      //console.log('cycle...');
      var shortTerm = brain.memory.short;
      var longTerm = brain.memory.long;

      if (!shortTerm.anything()) {

        var seed = brain.getDefaultSeed();
        var directive = brain.getDefaultDirective();

        return brain.ponder(seed,directive);
      }
      else {
        console.log('I remember...')        
      }
      


      if (!shortTerm.anything()) return "I have no recent memories.";
    }
 


    brain.process = function (words, directive) {

      var idea = brain.whatIs(words);
      var response = brain.ponder(idea, directive);
      return response;

    }

    brain.analyze = function (statement, noAsync) {

      var analysis = {};
      if (!statement) return analysis;

      var keywords = ex.keywordsFromStatement(statement);
      analysis.ideas = keywords;

      return analysis;

    }



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

      if (!idea) return "No ideas about that.";

      if (idea.see) idea = brain.whatIs(idea.see[0], true);

      var response = brain.logic.counterpose(idea,directive);

      response = brain.speech.prettify(response);

      return response;
    }

    // shortcuts
    brain.getMomentObject = function(moment) {
      return new brain.factory.MomentObject(moment)
    }


    brain.getSeed = function(seed) {
      return new brain.factory.Seed(seed)
    }

    brain.getContextObject = function(context) {
      return new brain.factory.ContextObject(context)
    }

  }
}
)