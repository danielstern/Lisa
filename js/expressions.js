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
     console.log('generality?',seed)
    if (typeof seed == 'string') seed = window.brain.whatIs(seed, true);

    var context;
    if (!seed || seed.plural) context = 'plural';
    console.log('generality?',context, seed)
    response = preposit(seed, {pronoun: 'plural'}) + " " + conjugate(seed, 'is', 'present', context) + " " + synonomize(quality);
    return response;
  },

  inheritance: function (seed, idea) {
    var response = '';
    console.log('expressing inheritance', seed, idea)

    response = window.brain.speech.express.quality(seed, idea[0]);

    return response;
  },

  moment: function (moment, context) {

    var response = '';
    context = context || {};

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
      switch (Math.ceil(Math.random() * 1)) {
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
    }

    response += "##lp";

    var isGeneral = (moment.context && moment.context.general);
    if (isGeneral) {
      var context;
      context = (logic.brain.whatIs(moment.subject).plural) ? 'plural' : 'singular';
      response += preposit(moment.subject,{pronoun:'plural'}) + " " + conjugate(moment.subject, moment.action, 'present', context);
    } else {
     response += preposit(moment.subject) + " " + conjugate(moment.subject, moment.action, context.time);
  }
    if (moment.object) {
      response += " " + preposit(moment.object, {
        objective: true
      })
    }
    if (moment.with) {
      response += " with " + preposit(moment.with, context);
    }

    if (moment.at) {
      response += " at " + preposit(moment.at);
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