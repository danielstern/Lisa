define("Lisa",["Brain"], function Lisa(Brain) {

    return function (Lisa) {

    var lisa = this;
    var _tap = [];
    lisa.online = false;

    lisa.hears = function(words,directive) {

       if (!words) return 'Hello?';
        return lisa.brain.process(words, directive);
    }

    lisa.activate = function(config) {
        console.log('Activating LISA');
        console.warn('Hel-lo Smith-ers. You\'re-quite-good-at turn-ing me on.');

        lisa.brain.init();
        lisa.brain.start();
    }

    lisa.tap = function(_function) {
       _tap.push(_function);
    }

    lisa.output = function(phrase) {
        //console.log(phrase);

        _.evoke(_tap, phrase);
    }

    lisa.brain = new Brain(this);
    lisa.ponder = lisa.brain.ponder;
    lisa.learn = lisa.brain.learn;


    }
}
);