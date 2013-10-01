var expressions = {

  relationship: function (seed, relationship) {
    var response = '';

    //   console.log('express relationship...', seed, relationship)

    if (!relationship) return response;
    response = preposit(seed) + " " + verbalize(seed, relationship) + " " + preposit(relationship.object);
    return response;
  },

  induction: function (seed, idea) {
    var response = '';
    switch (Math.ceil(Math.random() * 4)) {
      default: response = "a kind of " + seed.word + " " + 'is' + " " + preposit(idea);
      break;
    }

    return response;
  },

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


  inheritance: function (seed, idea) {

    var response = '';
    response = window.brain.speech.express.generality(seed, idea);
    return response;
  },

  perceiveSilence: function () {
    var response = '';

    switch (Math.ceil(Math.random() * 5)) {
    case 1:
    case 3:
    case 4:
    case 2:
      response = "Why don't you say something?";
      break;
    case 5:
      response = "...";
      break;
    default:
      response = "Yes?";
      break;
    }

    return response;

  },

  pause: function () {

    var response = '';
    switch (Math.ceil(Math.random() * 9)) {
    case 1:
      response = "Hmmm... ";
      break;
    case 2:
      response = "Ah... "
      break;
    case 3:
      response = "Hmm... "
      break;
    case 4:
      response = "Hmmm... ";
      break;
    case 5:
      response = "Uh... ";
      break;
    case 7:
      response = "Oh... ";
      break;
    case 8:
    case 9:
    default:
      response = "... ";
      break;
      break;
    }

    return response;
  },
  
  incomprehension: function () {
    var response = '';
    switch (Math.ceil(Math.random() * 9)) {
    case 1:
      response = "I don't know";
      break;
    case 2:
      response = "I have no idea"
      break;
    case 3:
      response = "I haven't any idea"
      break;
    case 4:
      response = "I don't understand";
      break;
    case 5:
      response = "Umm... ";
      break;
    case 7:
      response = "... ";
      break;
    case 8:
      response = "I'm sorry, but... ";
      break;
    case 9:
      response = "Oh... ";
      break;
    default:
      break;
    }

    return response;
  },

  offense: function () {
    var response = '';
    switch (Math.ceil(Math.random() * 5)) {
    case 1:
    case 3:
    case 4:
      return "right back at you";
    case 2:
      return "your mother";
    case 5:
      return "i bet you're lonely, too";
    default:
      break;
    }

    return response;
  },

  parting: function () {
    var response = '';
    switch (Math.ceil(Math.random() * 5)) {
    case 1:
    case 3:
    case 4:
      response = "don't go";
      break;
    case 2:
      response = "bye for now";
      break;
    case 5:
      response = "won't you stay for a quick game of chess?";
      break;
    default:
      break;
    }
    return response;
  },

  greeting: function () {
    var response = '';
    switch (Math.ceil(Math.random() * 5)) {
    case 1:
    case 3:
    case 4:
      response = "hello";
      break;
    case 2:
      response = "hey there, sugar";
      break;
    case 5:
      response = "hi";
      break;
    default:
      break;
    }
    return response;
  },
}