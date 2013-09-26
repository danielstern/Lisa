_.mixin({
     stringWithout: function(string, characters) {

     if (typeof characters == 'string') characters = [characters];

     _.each(characters,function(character){
       string = string.replace(character, '');
     })

     return string;
  },
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
  },
  extractIdeas: function(statement) {

    ideas = statement.split(/[\s,;:!?'"']+/);
    ideas = _.without(ideas, 'are','is','and','of','with','without','not','who','as','an','but','it','would','on','a','an','then','the','to','by','be','need','so','you','through','that','more','that’s','his','her','there','their','was','in');
    return ideas;

  },
  stringContains: function(string, characters) {

     if (typeof characters == 'string') characters = [characters];

     var inString = _.find(characters,function(character){
      if (string.toString().indexOf(character) != -1) {
        return character;
      }
     })

     return inString;
  },
    endsWith: function(string, character) {

      var lastCharOfString = string.toString().charAt(string.length - 1);
      return lastCharOfString == character;
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