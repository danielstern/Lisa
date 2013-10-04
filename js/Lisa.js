define("Lisa",["Brain"], function Lisa(Brain) {

   // console.log("Lisa loaded.")

    return function (Lisa) {

    var lisa = this;

    lisa.hears = function(words,directive) {

       if (!words) return 'Hello?';
        return lisa.brain.process(words, directive);
    }

    lisa.brain = new Brain();
    lisa.ponder = lisa.brain.ponder;
    lisa.learn = lisa.brain.learn;


    }
}
);