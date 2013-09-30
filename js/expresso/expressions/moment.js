var moment = {

  moment: function (moment, context) {

    var response = '';
    context = context || {};
          context.objective = false;

//    console.log('Telling story moment 1,',moment,context)

    // If the moment has relevance, express it...
    switch (moment.rel) {

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
      response += preposit(moment.subject,{pronoun:'plural'}) + " " + conjugate(moment.subject, moment.action, 'present', generalContext);
    } 
    else {

      var subjectContext = _.clone(context);
      var subjectIdea = logic.brain.whatIs(_.crack(moment.subject, true)) || {};
      subjectContext.pronoun = subjectIdea.pronoun;
      response += preposit(moment.subject, subjectContext) + " " + conjugate(moment.subject, moment.action, context.time);
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

    if (moment.in) {
      response += " in " + preposit(moment.in, _.clone(context));
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

    if (moment.too) {
          response += brain.speech.lightPause();
      response += " too ";
    }

   

    return response;
  },


}