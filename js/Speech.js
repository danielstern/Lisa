function Speech(host) {

  var speech = this;
  speech.host = host;
  speech.express = new Expresso(host.brain);
  speech.brain = host.brain;
  var response = '';
 
  speech.softPause = function() {
    return "//";
  }


  speech.prettify = function(phrase) {
     
    phrase = _.lisaFormat(phrase,speech.host.brain.personality.filter);
    return phrase;
  }
}
