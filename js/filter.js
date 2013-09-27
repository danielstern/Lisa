var _lisaFilter = function(string) {
  
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
