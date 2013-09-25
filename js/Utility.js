_.mixin({
     capitalize: function(string) {
      var strings = string.split('//');
      strings = _.without(strings, '');

      strings = _.map(strings, function(string){
        string = string.charAt(0).toUpperCase() + string.substring(1);  
        //string = string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();  
        string += ('. ');
        if (Math.random() > 0.3) string += "</p><p>"; 
        return string;
      })
      var returnString = strings.join('');
      return returnString;
  }
});