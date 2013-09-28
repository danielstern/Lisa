function Speech(brain) {

  var speech = this;
  speech.brain = brain;
  speech.express = new Expresso(brain);
  var response = '';

  speech.softPause = function () {
    return "##sp";
  }

  speech.hardPause = function () {
    return "##hp";
  }


  speech.prettify = function (phrase) {

    phrase = _.lisaFormat(phrase, speech.brain.personality.filter);
    return phrase;
  }
}