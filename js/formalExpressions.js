var formalExpressions = {
  formalGreeting: function () {
    switch (Math.ceil(Math.random() * 4)) {
    case 1:
      response = "Hello and welcome";
      break;
    case 2:
      response = "Thank you for visiting us today";
      break;
    case 3:
      response = "Welcome";
      break;
    case 4:
      response = "Thank you for coming, as always.";
      break;
      break;
    }
    return response;
  },

}