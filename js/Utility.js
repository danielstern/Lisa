_.mixin({
     capitalize: function(string) {
      var strings = string.split('//');
      strings = _.without(strings, '');

      strings = _.map(strings, function(string){
        string = string.charAt(0).toUpperCase() + string.substring(1);  
        string += ('. ');
        if (Math.random() > 0.1) string += "</p><p>"; 
        return string;
      })
      var returnString = strings.join('');
      return returnString;
  }
});

_.mixin({
     endsWith: function(string, character) {

      var lastCharOfString = string.toString().charAt(string.length - 1);
      return lastCharOfString == character;
  }
});

_.mixin({
     stringContains: function(string, characters) {

     if (typeof characters == 'string') characters = [characters];

     var inString = _.find(characters,function(character){
      if (string.toString().indexOf(character) != -1) {
        return character;
      }
     })

     return inString;
  }
});

function Promise(params) {

 var promise = this;
 this.then = function(callback){
   promise.resolve = callback;      
  }

  this.word = this;
  this.resolve = this.callback;


}