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
    case 3:
    case 4:
      response = lexicate(seed) + " " + conjugate(seed, 'is') + " a kind of " + idea;
      break;
    case 2:
      response = lexicate(seed) + " " + conjugate(seed, 'is') + " a type of " + idea;
      break;
    case 5:
      response = lexicate(seed) + " " + conjugate(seed, 'is') + " a variety of " + idea;
    default:
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
      response = lexicate(moment.subject) + " " + conjugate(moment.subject, moment.action, context.time);
    if (moment.object) {
      response += " " + lexicate(moment.object)
    } 
    if (moment.with) {
      response += " with " + preposit(moment.with);
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
      response = "Both " + lexicate(subject) + " and " + lexicate(object) + " are " + trait;
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
    response = "My " + key + " is " + value;
    return response;
  },

  induction: function (seed, idea) {
    switch (Math.ceil(Math.random() * 4)) {
    case 1:
    case 3:
      // response += lexicate(idea) + " " + conjugate(idea, 'is') +" " + lexicate(seed);
      // break;
    case 4:
      response = "One kind of " + seed.word + " " + 'is' + " " + lexicate(idea);
      break;
    case 2:
      response = "A kind of " + seed.word + " " + 'is' + " " + lexicate(idea);
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