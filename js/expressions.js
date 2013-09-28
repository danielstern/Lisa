var standardExpressions1 = {

  quality: function (seed, quality) {
    var response = '';
    response = lexicate(seed) + " " + conjugate(seed, 'is') + " " + synonomize(quality);
    return response;
  },

  inheritance: function (seed, idea) {
    var response = '';
    switch (Math.ceil(Math.random() * 5)) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    default:
      response = lexicate(seed) + " " + conjugate(seed, 'is') + " a " + idea;
      break;
    }
    return response;
  },

  personalTrait: function (trait) {
    var response = '';
    response = "I'm " + trait;
    return response;
  },

  association: function (seed, idea) {
    var response = '';
    response = lexicate(seed) + " " + conjugate(seed, 'reminds') + " me of " + lexicate(idea);
    return response;
  },

  moment: function (moment, context) {

    var response = '';

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
    
    response += lexicate(moment.subject) + " " + conjugate(moment.subject, moment.action, context.time);
    if (moment.object) {
      response += " " + lexicate(moment.object)
    } 
    if (moment.with) {
      response += " with " + preposit(moment.with);
    } 

    if (moment.against) {
      response += " against " + preposit(moment.against, {objective:true});
    }

    if (moment.to) {
      response += " to " + preposit(moment.to);
    } 
    return response;
  },

  relationship: function (seed, relationship) {
    var response = '';

    if (!relationship) return response;
    response = lexicate(seed) + " " + verbalize(seed, relationship) + " " + preposit(relationship.object, {pronoun:'plural'});
    return response;
  },


  sharedQuality: function (subject, object, trait) {
    var response = '';

    switch (Math.ceil(Math.random() * 4)) {
    case 1:
    case 3:
    case 4:
    default:
      response = lexicate(subject) + " and " + lexicate(object) + " are both " + trait;
      break;
    }
    return response;
  },

  possessive: function (key, value) {
    response = "my " + key + " is " + value;
    return response;
  },

  induction: function (seed, idea) {
    var response = '';
    switch (Math.ceil(Math.random() * 4)) {
      default:
      response = "a kind of " + seed.word + " " + 'is' + " " + lexicate(idea);
      break;
    }

    return response;
  }
}