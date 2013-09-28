var formalExpressions = {
  formalGreeting: function () {
    switch (Math.ceil(Math.random() * 4)) {
    case 1:
      response = "hello and welcome";
      break;
    case 2:
      response = "thank you for visiting us today";
      break;
    case 3:
      response = "welcome";
      break;
    case 4:
      response = "thank you for coming, as always.";
      break;
      break;
    }
    return response;
  },

}