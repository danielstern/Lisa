function Momento(brain) {
  var mm = this;
  mm.moment = function(moment, context) {

    var response = '';
    context = context || {};
    context.objective = false;
    var express = brain.speech.express;
    var preposit = express.preposit;
    var synonomize = express.synonomize;
    var conjugate = express.conjugate;

  //  console.log('tell story moment...',moment,context);

    if (moment.dialogue) {

     // console.log('this is a dialogue...');
      var dialogue = moment.dialogue;
      var firstSpeaking = true;

      _.each(dialogue.said, function(phrase) {
        var dialogueMoment = {};
        var first = dialogue.between.first;
        var second = dialogue.between.second;
        dialogueMoment.subject = (firstSpeaking ? first : second);
        dialogueMoment.action = ('say');
        dialogueMoment.to = (firstSpeaking ? second : first);
        firstSpeaking = !firstSpeaking;

        dialogueMoment.said = phrase;
       // console.log('new moment?',dialogueMoment);

        response += express.moment(dialogueMoment,context);
        response += brain.speech.hardPause();


      })

      return response;
    };



    // If the moment has relevance, express it...
    switch (context.once || moment.rel) {

    case 'but':
      switch (Math.ceil(Math.random() * 2)) {
      case 1:
        response += 'but'
        break;
      case 2:
        response += 'however'
        break;
      }
      break;

    case 'so':
      switch (Math.ceil(Math.random() * 3)) {
      case 1:
        response += 'so'
        break;
      case 2:
        response += 'thus'
        break;
      case 3:
        response += 'as a result'
        break;
      }
      break;

    case 'then':
      switch (Math.ceil(Math.random() * 3)) {
      case 1:
        response += 'after that'
        break;
      case 2:
        response += 'then'
        break;
      }
      break;
    }

    // add a soft pause of necessary
    if (moment.rel) response += "##lp";

    // if the moment's context suggests it is a general moment, express it generally
    var isGeneral = (moment.context && moment.context.general);
    if (isGeneral) {

      var generalContext;
      if (!logic.brain.whatIs(moment.subject)) generalContext = 'plural';
      generalContext = generalContext || (logic.brain.whatIs(moment.subject) && logic.brain.whatIs(moment.subject).plural) ? 'plural' : 'singular';
      response += express.preposit(moment.subject,{pronoun:'plural'}) + " " + express.conjugate(moment.subject, moment.action, 'present', generalContext);
    } 
    else {

      var subjectContext = _.clone(context);
      var subjectIdea = brain.whatIs(_.crack(moment.subject, true)) || {};
      subjectContext.pronoun = subjectIdea.pronoun;
      response += express.preposit(moment.subject, subjectContext) + " " + express.conjugate(moment.subject, moment.action, context.time,'singular');
    }

    context.objective = true;

    if (moment.object) {
      //context.objective = true;
      response += " " + preposit(moment.object, _.clone(context));
    }


    if (moment.what) {
      response += " " + moment.what + " ";
    }


    if (moment.down) {
      response += " down " + preposit(moment.down);
    }

    if (moment.over) {
      response += " over " + preposit(moment.over, _.clone(context));
    }


    if (moment.with) {
      response += " with " + preposit(moment.with, _.clone(context));
    }

    if (moment.at) {
      response += " at " + preposit(moment.at, _.clone(context));
    }

    if (moment.out) {
      response += " out of " + preposit(moment.out, _.clone(context));
    }


    if (moment.in) {
      response += " in " + preposit(moment.in, _.clone(context));
    }

    if (moment.on) {
      response += " on " + preposit(moment.on, _.clone(context));
    }

    if (moment.against) {
      var pronoun = (isGeneral) ? 'plural':'singular'
      var againstContext = _.clone(context);
      againstContext.pronoun = pronoun;
      againstContext.main = true;
      againstContext.objective = true;
      response += " against " + preposit(moment.against, againstContext);
    }


    if (moment.to) {
      response += " to " + preposit(moment.to, _.clone(context));
    }

    if (moment.from) {
      response += " from " + preposit(moment.from, _.clone(context));
    }


    if (moment.said) {
      response += brain.speech.lightPause();
      response += ' "' + moment.said  + '" ';
      response += brain.speech.hardPause();
    }

    if (moment.howMuch) {
      response += ' ' + preposit(moment.howMuch)  + ' ';
    }

    if (moment.during) {
      response += " during " + preposit(moment.during);
    }

    if (context.once) {
      response += brain.speech.lightPause();
      response += "once";
    }

    if (moment.too) {
          response += brain.speech.lightPause();
      response += " too ";
    }

    console.log("Story moment",moment,context);

    return response;
  }
}