var _filterSouthernGal = function(string) {
  
	var response = string;

	switch (Math.ceil(Math.random()*50))
  {
    case 1:
      response += ", shug";
      break;
    case 2:
      response += ", sugar"
      break;
    case 3:
      response += ", hun'"
      break;
    case 4:
      response += ", honey";
      break;
    case 5:
      break;
    case 7:
      response = "well, " + response;
      break;
    case 8:
      response = "so, " + response;
      break;
    case 9:
      break;
    case 10:
     response = response + "...";
      break;
    case 11:
      break;
    default:
      break;
  }

  return response;
}

var _filterMadCommoner = function(string) {
  
  var response = string;

  switch (Math.ceil(Math.random()*50))
  {
    case 1:
      response += ", m'lord";
      break;
    case 2:
      response += ", milord"
      break;
    case 3:
      response += ", ser"
      break;
    case 4:
      response += ", hee-hee ha ha.";
      break;
    case 5:
      response += "... *giggle*";
      break;
    case 7:
      response = "well, " + response;
      break;
    case 8:
      response = "so, " + response;
      break;
    case 9:
      response += "... ah hah hah hah hah!";
      break;
    case 10:
     response = "Hahaha... " + response;
      break;
    case 11:
      break;
    default:
      break;
  }

  return response;
}