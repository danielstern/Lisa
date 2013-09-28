var standardExpressions1 = {

  nonsense: function () {
    return "I need scissors! 67!";
  },
  
  quality: function (seed, quality) {
    response = lexicate(seed) + " " + conjugate(seed, 'is') + " " + quality;
    return response;
  },

  inheritance: function (seed, idea) {
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
    response = "I'm " + trait;
    return response;
  },

  association: function (seed, idea) {
    response = lexicate(seed) + " " + conjugate(seed, 'reminds') + " me of " + lexicate(idea);
    return response;
  },

  moment: function (moment, context) {

    response = '';

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
    }

    response += "##lp";
    
    response += lexicate(moment.subject) + " " + conjugate(moment.subject, moment.action, context.time);
    if (moment.object) {
      response += " " + lexicate(moment.object)
    } 
    if (moment.with) {
      response += " with " + preposit(moment.with);
    } 

    if (moment.to) {
      response += " to " + preposit(moment.to);
    } 
    return response;
  },

  association: function (seed, idea) {
    response = lexicate(seed) + " " + conjugate(seed, 'reminds') + " me of " + lexicate(idea);
    return response;
  },

  relationship: function (seed, relationship) {
    if (!relationship) return response;
    response = lexicate(seed) + " " + verbalize(seed, relationship) + " " + preposit(relationship.object);
    return response;
  },


  sharedQuality: function (subject, object, trait) {
    switch (Math.ceil(Math.random() * 4)) {
    case 1:
    case 3:
    case 4:
      response = lexicate(subject) + " and " + lexicate(object) + " are both " + trait;
      break;
    case 2:
      response = "both " + lexicate(subject) + " and " + lexicate(object) + " are " + trait;
      break;
      /*case 5:
         response += lexicate(subject) + " and " + lexicate(object)  + " are similar because they are both " + trait;
        break;*/
    default:
      break;
    }
    return response;
  },

  possessive: function (key, value) {
    response = "my " + key + " is " + value;
    return response;
  },

  induction: function (seed, idea) {
    switch (Math.ceil(Math.random() * 4)) {
    case 1:
    case 3:
      // response += lexicate(idea) + " " + conjugate(idea, 'is') +" " + lexicate(seed);
      // break;
    case 4:
      response = "one kind of " + seed.word + " " + 'is' + " " + lexicate(idea);
      break;
    case 2:
      response = "a kind of " + seed.word + " " + 'is' + " " + lexicate(idea);
      break;
      /*case 5:
        response += "I consider " + lexicate(idea) + " to be a kind of " + seed.word;
        break;*/
    default:
      break;
    }

    return response;
  }
}