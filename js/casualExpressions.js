var casualExpressions = {
  perceiveSilence: function () {

    switch (Math.ceil(Math.random() * 5)) {
    case 1:
    case 3:
    case 4:
      response = "Yes?";
      break;
    case 2:
      response = "Why don't you say something?";
      break;
    case 5:
      response = "...";
      break;
    default:
      break;
    }
    
    return response;

  },
  pause: function () {
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
      response = "... ";
      break;
    case 8:
      response = "And... ";
      break;
    case 9:
      response = "Oh... ";
      break;
    default:
      break;
    }

    return response;
  },
  incomprehension: function () {
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