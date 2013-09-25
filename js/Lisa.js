 function Lisa(personality) {

    var Lisa = this;
    var inTheConversation = [];
    Lisa.personality = personality;

    Lisa.name = name || 'Lisa';

    Lisa.thinks = function(thought) {

      console.log('LISA:' , thought);
    }

    Lisa.hears = function(words) {

      var reply = Lisa.brain.process(words);
      Lisa.says(reply);


    }

    Lisa.isTalkingTo = function(thing) {

      inTheConversation.push(thing);

    }

    Lisa.saySomethingRandom = function() {

      var _callback;

     Lisa.brain.ponder().then(
      function(response)
      {
        _callback(response)
      });

      return {
        then:function(callback){
          _callback = callback; 
        }
      }
    };


    Lisa.says = function(words) {

      _.each(inTheConversation, function(_responder){_responder(words)})
      return words;

    }

    Lisa.brain = new Brain(Lisa);
  }