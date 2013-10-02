function Speech(brain) {

  var speech = this;
  speech.brain = brain;

  speech.conjugator = new Conjugator(brain);
  speech.lexicator = new Lexicator(brain);
  speech.prepositor = new Prepositor(brain);

  speech.momento = new Momento(brain);
  speech.express = speech.momento;

  speech.preposit = speech.prepositor.preposit;
  speech.conjugate = speech.conjugator.conjugate;
  speech.synonomize = speech.conjugator.conjugate;

  speech.softPause = function () {
    return "##sp";
  }

 speech.pause = function () {
    return "... ( a pause )";
  }


  speech.hardPause = function () {
    return "##hp";
  }

  speech.lightPause = function () {
    return "##lp";
  }

  speech.prettify = function (phrase) {

    phrase = _.lisaFormat(phrase);
    return phrase;
  }
}