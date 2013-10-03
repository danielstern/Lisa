 function Lisa() {

    var Lisa = this;
    var lisa = Lisa;
    var inTheConversation = [];

    Lisa.name = name || 'Lisa';


    Lisa.hears = function(words,directive) {

	if (!words) {
		  var response = Lisa.brain.ponder();
		  response[0] = lisa.brain.speech.prettify(response[0]);
		return response;
	}

      return Lisa.brain.process(words, directive);

    }

    Lisa.brain = new Brain(Lisa);
    Lisa.ponder = Lisa.brain.ponder;
    
    Lisa.learn = lisa.brain.learn;
  }