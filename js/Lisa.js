 function Lisa(personality) {

    var Lisa = this;
    var inTheConversation = [];

    Lisa.name = name || 'Lisa';


    Lisa.hears = function(words) {

      return Lisa.brain.process(words,true);

    }

    Lisa.brain = new Brain(Lisa);
    Lisa.ponder = Lisa.brain.ponder;
  }