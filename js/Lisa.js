 function Lisa(personality) {

    var Lisa = this;
    var inTheConversation = [];
    Lisa.personality = personality;

    Lisa.name = name || 'Lisa';

    Lisa.thinks = function(thought) {

      if (_.endsWith(thought,'!')) {
        console.warn('LISA:' , thought)
        return
      };
      console.log('LISA:' , thought);
    }

    Lisa.hears = function(words) {

      Lisa.brain.process(words).then(function(reply){
        Lisa.says(reply);
      });


    }

    Lisa.isTalkingTo = function(thing) {

      inTheConversation.push(thing);

    }

    Lisa.saySomethingRandom = function() {

      var _callback;
      var promise = new Promise(_callback);

     Lisa.brain.ponder().then(function(response) {
        promise.resolve(response)
     });

      return promise;
    
    };


    Lisa.says = function(words) {

      _.each(inTheConversation, function(_responder){_responder(words)})
      return words;

    }

    Lisa.brain = new Brain(Lisa);
  }