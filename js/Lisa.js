define("Lisa",["Brain"], function Lisa(Brain) {

    console.log("Lisa loaded.")

    return function (Lisa) {

    var Lisa = this;
    var lisa = Lisa;

    Lisa.hears = function(words,directive) {

       if (!words) return 'Hello?';
        return Lisa.brain.process(words, directive);
    }

    Lisa.brain = new Brain(Lisa);

    return;
    Lisa.ponder = Lisa.brain.ponder;
    Lisa.learn = lisa.brain.learn;

    }
    }
);