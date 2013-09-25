
  function Brain(host) {

    var brain = this;
    this.host = host;
   //this.lexicon = localStorage.getItem('lexicon') || Lexicon;
   //console.log('lexicon?' , JSON.parse(localStorage.getItem('lexicon')) )
   //localStorage.getItem('lexicon').toString();
   this.lexicon = Lexicon;
    this.host.thinks('I have a lexicon!');
    this.host.thinks(this.lexicon);
    this.personality = this.host.personality;
    this.mood = this.personality;

    brain.process = function(words) {

      this.host.thinks('Hmm, someone said ' + words + '.');
      var $analysis = this.analyze(words);
      this.host.thinks($analysis);
      var response;

      var idea = brain.whatIs(words);
      this.host.thinks(idea);

      if(idea)  {
        response ='Oooh! I know what that is. ';
         response += brain.ponder(idea);
      }

      return response || "I don't know what that means.";

    }

    brain.analyze = function(words) {

      var analysis = {};
      var singleWords = words.split(' ');
      analysis['wordCount'] = singleWords.length;
      analysis['isQuestion'] = words.indexOf('?') != -1;
      analysis['refersToHost'] = words.indexOf(this.host.name) != -1;
      analysis['wordsRecognized'] = _.map(singleWords, function(word) { 
      
      })
      return analysis;

    }

    brain.whatIs = function(word) {

      brain.host.thinks('Hmmmmm...')
      var idea = _.find(brain.lexicon.things, function(idea){return idea.word.toLowerCase() == word.toLowerCase()});

      if (!idea) idea = _.find(brain.lexicon.things, function(idea){if (!idea.plural) return false; return idea.plural.toLowerCase() == word.toLowerCase()});
      return idea;

    }

    brain.ponder = function(idea) {

      brain.seed = idea || _.sample(this.lexicon.things);
      var response = '';
      var seed = brain.seed;
      var things = brain.lexicon.things;



      for (var i = 0; i < brain.mood.chatty; i++) {
           switch (Math.ceil(Math.random()*10))
           {
             case 1:
               response = scopeDown(brain.seed, response);
               break;
              
             case 2:
             case 3:
               response = compare(brain.seed, response);
             case 6:
             case 8:
               response = demystify(brain.seed, response);
               break;
             case 4:
              case 7:
               response = scopeSideways(brain.seed, response);
               break;
             case 5:
               response = scopeUp(brain.seed, response);
               break;
              default:
               break;
             }
           }


         response = scopeUp(seed, response);
  

      function demystify(seed, response)
      {
         if (!seed.is) return response;
         response += brain.speech.express.quality(seed, _.sample(seed.is));
        response += "//";
         
         return response;
      }

      function scopeUp(seed, response) 
      {
         if (!seed.extends) return response;

         response += brain.speech.express.inheritance(seed, seed.extends);
         response += "//";

         brain.host.thinks("I'm scoping up. " + response)


         var scopeUpIdea = _.where(things,{word:seed.extends[0]});
         if (scopeUpIdea[0]) brain.seed = scopeUpIdea[0];
         return response; 
      }

      function scopeDown(seed, response) 
      {
          var scopeDownIdea = _.filter(things,function(thing){
            if (!thing.extends) return false;
            if (thing.word == seed.word) return false;
            if (thing.extends[0] == seed.word) return true;
            return false;
          })
          if (!scopeDownIdea) return response;

          brain.host.thinks("I am scoping down.");  
            
         if (scopeDownIdea[0]) {
          var idea = _.sample(scopeDownIdea);
          brain.seed = idea;
          response += brain.speech.express.induction(seed, idea);
          response += "//";
         }
         return response;
      }

      /* compare 
         find something that shares a trait with the idea's seed
      */

      function compare (seed,response)
      {
        for (var i = 0; i < brain.mood.inquisitive; i++)
        {
           var trait = _.sample(seed.is);
           var thing = _.sample(things);

           if(_.contains(thing.is, trait) && thing.word != seed.word) 
           {
             response += brain.speech.express.sharedQuality(seed, thing, trait);
             response += "//";
             return response;
           }
        }
        return response;
      }

      /* contrast */

      /*  scope sideways */
      /*
         find something that is like the seed and start pondering that
      */
      function scopeSideways(seed, response)
      {
        if (!seed.extends) return response;
        var relatedThings = _.filter(brain.lexicon.things, function(thing){
          if (!thing.extends) return false;
          if (thing.word == seed.word) return false;
          return thing.extends[0] == seed.extends[0]
        });

        if (!relatedThings) return response;
        var sidewaysIdea = _.sample(relatedThings);
        if (!sidewaysIdea) return response;
        response += brain.speech.express.association(sidewaysIdea, seed);
        response += "//";
        brain.seed = sidewaysIdea;

        return response;

      }


      response = brain.speech.prettify(response);
      return response;

    }

    brain.speech = new Speech(brain.host);

  }
