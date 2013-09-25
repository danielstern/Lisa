
  function Brain(host) {

    var brain = this;
    this.host = host;
   //this.lexicon = localStorage.getItem('lexicon') || Lexicon;
   //console.log('lexicon?' , JSON.parse(localStorage.getItem('lexicon')) )
   //localStorage.getItem('lexicon').toString();
    this.lexicon = Lexicon;
    this.personality = this.host.personality;
    this.mood = this.personality;
    brain.logic = new Logic(brain);
    brain.speech = new Speech(brain.host);
    var things = brain.lexicon.things;

    brain.process = function(words) {

      var response = '';
      var idea = brain.whatIs(words);

      if (idea)  
      {
        response += brain.ponder(idea);
      }

      return brain.speech.prettify(response) || "I don't know what that means.";

    }

    brain.whatIs = function(word) {

      brain.host.thinks('What is... ' + word)
      var idea;
      idea = _.find(brain.lexicon.things, function(idea){return idea.word.toLowerCase() == word.toLowerCase()});
        if(idea) return idea;
      
      idea = _.find(brain.lexicon.things, function(idea){if (!idea.plural) return false; return idea.plural.toLowerCase() == word.toLowerCase()});
       if(idea) return idea;

      idea = _.find(brain.lexicon.expressions, function(idea){return idea.said.toLowerCase() == word.toLowerCase()});
        if(idea) return idea;

    }



    brain.ponder = function(idea) {

      brain.host.thinks('ponder...');
      brain.seed = idea || _.sample(this.lexicon.things);
      var response = '';
      var seed = brain.seed;
      
      var logic = brain.logic;

      if (seed.said !== undefined) 
      {
         response = brain.logic.colloquilize(seed);
         return response;
      }



      for (var i = 0; i < brain.mood.chatty; i++) {
           switch (Math.ceil(Math.random()*10))
           {
             case 1:
               response = logic.scopeDown(brain.seed, response);
               break;
              
             case 2:
             case 3:
               response = logic.compare(brain.seed, response);
               break;
             case 6:
             case 8:
               response = logic.demystify(brain.seed, response);
               break;
             case 4:
              case 7:
               response = logic.scopeSideways(brain.seed, response);
               break;
             case 5:
               response = logic.scopeUp(brain.seed, response);
               break;
              default:
               break;
             }
           }

      response = brain.speech.prettify(response);
      return response;

    }
  }
