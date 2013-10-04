 function Lisa() {

    var Lisa = this;
    var lisa = Lisa;

    Lisa.hears = function(words,directive) {

	   if (!words) return 'Hello?';
        return Lisa.brain.process(words, directive);
    }

    Lisa.brain = new Brain(Lisa);
    Lisa.ponder = Lisa.brain.ponder;
    Lisa.learn = lisa.brain.learn;
  }