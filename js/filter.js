var _filterSouthernGal = function() {
  
  this.filterString = function(string)
  {
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
        break;
      case 8:
        break;
      case 9:
        break;
      case 10:
       response += "...";
        break;
      case 11:
        break;
      default:
        break;
    }

    return response;
  }

}
var _filterMadCommoner = function(string) {

  this.filterString = function(string)
  {
    
    var response = string;

    switch (Math.ceil(Math.random()*50))
    {
      case 1:
        response += "##lpm'lord";
        break;
      case 2:
        response += "##lpmilord"
        break;
      case 3:
        response += "##lpser"
        break;
      case 4:
        break;
      case 5:
        response += "... *giggle*";
        break;
      case 7:
        break;
      case 8:
        break;
      case 9:
        response += "##lpheh";
        break;
      case 10:
        break;
      case 11:
        break;
      default:
        break;
    }

    return response;

  }

  this.commentize = function(string)
  {
    
    var response = string;

    switch (Math.ceil(Math.random()*50))
    {
      case 1:
        response += "##lpmi think";
        break;
      case 2:
        response += "##lpmeh"
        break;
      case 3:
        response = "i've heard " += response; 
        break;
      case 4:
        break;
      case 5:
        response += "... *giggle*";
        break;
      case 7:
        break;
      case 8:
        break;
      case 9:
        response += "##lpheh";
        break;
      case 10:
        break;
      case 11:
        break;
      default:
        break;
    }

    return response;

  }
}