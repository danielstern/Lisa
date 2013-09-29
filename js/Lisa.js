 function Lisa(personality) {

    var Lisa = this;
    var inTheConversation = [];
    Lisa.personality = personality || {
      cheerful:5,
      chatty:8,
      friendly:5,
      inquisitive:20
  };

    Lisa.name = name || 'Lisa';

    Lisa.thinks = function(thought, anotherThought, thirdThought) {

      var action 
      switch(_.stringLastChar(thought))
      {
        case('!'):
        action = 'warn';
        break;
        case('?'):
        action = 'info';
        break;
        default:
        action = 'log';
        break;
      }

      thought = _(thought).capitalize();

      if (thought && anotherThought && thirdThought) return console[action]('LISA:' , thought, anotherThought, thirdThought);
      if (thought && anotherThought) return console[action]('LISA:' , thought, anotherThought);
      if (thought) return console[action]('LISA:' , thought);
    }

    Lisa.hears = function(words) {

      return Lisa.brain.process(words,true);

    }

    Lisa.isTalkingTo = function(thing) {

      inTheConversation.push(thing);

    }

    



    Lisa.says = function(words) {

      _.each(inTheConversation, function(_responder){_responder(words)})
      return words;

    }

    Lisa.brain = new Brain(Lisa);
    Lisa.ponder = Lisa.brain.ponder;
  }