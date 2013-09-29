var standardExpressions1 = {

  quality: function (seed, quality) {
    var response = '';
    if (!seed) return response;
    response = window.brain.speech.express.moment({
      subject: seed.word,
      object: quality,
      action: 'is'
    })
    return response;
  },

  generality: function (seed, quality) {
    var response = '';
  // console.log('generality?',seed, quality)
    if (typeof seed == 'string') seed = window.brain.whatIs(seed, true);

    var prepositedSubjects = '';
    if (seed instanceof Array) {
      var things = [];
      things = _.map(seed,function(miniSeed){
        return preposit(miniSeed,{plural:true,pronoun:'plural'});
      })

      console.log('Its an array. Things?' , things);
      prepositedSubjects = _.toSentence(things);

    }

    var context;
    if (!seed || seed.plural) context = 'plural';

    var objectForm = 'plural';
    if (seed.pronoun == 'proper') objectForm = 'singular';
    if (prepositedSubjects) {
      response = prepositedSubjects + " " + conjugate(seed, 'is', 'present', 'plural') + " " + preposit(quality,{pronoun: 'plural'});
    } else {
       console.log('no preposited subjects...',seed,quality)
       response = preposit(seed, {pronoun: 'plural'}) + " " + conjugate(seed, 'is', 'present', context) + " " + preposit(quality,{pronoun: objectForm});
       console.log('response?',response)
    }
    return response;
  },

  inheritance: function (seed, idea) {
    var response = '';
   //console.log('expressing inheritance', seed, idea)

    response = window.brain.speech.express.generality(seed, idea);

    return response;
  },

  moment: function (moment, context) {

    var response = '';
    context = context || {};

    console.log('Telling story moment...',moment,context)

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
        response += 'then'
        break;
      case 2:
        response += 'after that'
        break;
      case 3:
        response += 'subsequently'
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
      generalContext = (logic.brain.whatIs(moment.subject).plural) ? 'plural' : 'singular';
      generalContext += preposit(moment.subject,{pronoun:'plural'}) + " " + conjugate(moment.subject, moment.action, 'present', generalContext);
    } 
    else {

      var subjectContext = _.clone(context);
      var subjectIdea = logic.brain.whatIs(_.crack(moment.subject, true)) || {};
      subjectContext.pronoun = subjectIdea.pronoun;
      response += preposit(moment.subject, subjectContext) + " " + conjugate(moment.subject, moment.action, context.time);
    }

    if (moment.object) {
      context.objective = true;
      response += " " + preposit(moment.object, _.clone(context));
    }
    if (moment.with) {
      response += " with " + preposit(moment.with, context);
    }

    if (moment.at) {
      response += " at " + preposit(moment.at);
    }

    if (moment.in) {
      response += " in " + preposit(moment.in, context);
    }

    if (moment.against) {
      var pronoun = (isGeneral) ? 'plural':'singular'
      response += " against " + preposit(moment.against, {
        main: true,
        objective: true,
        pronoun: pronoun
      });
    }

    if (moment.to) {
      response += " to " + preposit(moment.to);
    }

    if (moment.during) {
      response += " during " + preposit(moment.during);
    }

    return response;
  },

  relationship: function (seed, relationship) {
    var response = '';

    console.log('express relationship...', seed, relationship)

    if (!relationship) return response;
    response = preposit(seed) + " " + verbalize(seed, relationship) + " " + preposit(relationship.object);
    return response;
  },


  sharedQuality: function (subject, object, trait) {
    var response = '';

    switch (Math.ceil(Math.random() * 4)) {
    case 1:
    case 3:
    case 4:
    default:
      response = preposit(subject) + " and " + preposit(object) + " are both " + trait;
      break;
    }
    return response;
  },

  induction: function (seed, idea) {
    var response = '';
    switch (Math.ceil(Math.random() * 4)) {
      default: response = "a kind of " + seed.word + " " + 'is' + " " + preposit(idea);
      break;
    }

    return response;
  }
}