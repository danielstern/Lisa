var standardExpressions1 = {

  quality: function (seed, quality) {
    var response = '';
  //  console.log('quality?',seed,quality)
    response = preposit(seed) + " " + conjugate(seed, 'is') + " " + synonomize(quality);
  //    console.log('response coming from quality?',response)
    return response;
  },


  generality: function (seed, quality) {
    var response = '';
  //  console.log('quality?',seed,quality)
    response = preposit(seed,{pronoun:'plural'}) + " " + conjugate(seed, 'is','present','plural') + " " + synonomize(quality);
  //    console.log('response coming from quality?',response)
    return response;
  },

  inheritance: function (seed, idea) {
    var response = '';
    console.log('expressing inheritance',seed,idea)

      response = preposit(seed) + " " + conjugate(seed, 'is') + " " + preposit(idea[0]);

    return response;
  },

  personalTrait: function (trait) {
    var response = '';
    response = "I'm " + trait;
    return response;
  },

  association: function (seed, idea) {
    var response = '';
    response = preposit(seed) + " " + conjugate(seed, 'reminds') + " me of " + lexicate(idea);
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
    
    response += preposit(moment.subject) + " " + conjugate(moment.subject, moment.action, context.time);
    if (moment.object) {
      response += " " + preposit(moment.object, {objective:true})
    } 
    if (moment.with) {
      response += " with " + preposit(moment.with, context);
    } 

    if (moment.at) {
      response += " at " + preposit(moment.at);
    } 

    if (moment.against) {
      response += " against " + preposit(moment.against, {main:true,objective:true});
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

    console.log('express relationship...',seed,relationship)

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

  possessive: function (key, value) {
    response = "my " + key + " is " + value;
    return response;
  },

  induction: function (seed, idea) {
    var response = '';
    switch (Math.ceil(Math.random() * 4)) {
      default:
      response = "a kind of " + seed.word + " " + 'is' + " " + preposit(idea);
      break;
    }

    return response;
  }
}