 function Lisa() {

    var Lisa = this;
    var lisa = Lisa;
    var inTheConversation = [];

    Lisa.name = name || 'Lisa';


    Lisa.hears = function(words,directive) {

    //    console.log('lisa hears...',words,directive);

    	if (!words) {
    		  var response = Lisa.brain.ponder();
    		  response[0] = lisa.brain.speech.prettify(response[0]);
    		return response;
    	}

      return Lisa.brain.process(words, directive);

    }
/*
    Lisa.do = function(directive,seed) {

    	var response = Lisa.brain.logic.ponder(Lisa.brain.seed,Lisa.brain.logic,directive);
    	response[0] = lisa.brain.speech.prettify(response[0]);
      return response;

    }
*/

    Lisa.brain = new Brain(Lisa);
    Lisa.ponder = Lisa.brain.ponder;
    
    Lisa.learn = lisa.brain.learn;
  }