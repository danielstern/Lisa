_.mixin({
  stringWithout: function(string, characters) {

     if (typeof characters == 'string') characters = [characters];

     _.each(characters,function(character){
       string = string.replace(character, '');
     })

     return string;
  },

  lisaFormat: function(string, filter) {
    string = string.replace('||','</p><p>')
    var strings = string.split('//');
    strings = _.without(strings, '');

    strings = _.map(strings, function(string){
      if (filter) {
        string = filter(string);
      }
      string = string.charAt(0).toUpperCase() + string.substring(1);  
      string += ('. ');

      return string;
    })
    var returnString = strings.join('');
    return returnString;
  },

  extractIdeas: function(statement) {

    ideas = statement.split(/[\s,;:!?'"']+/);
    ideas = _.without(ideas, 'are','is','and','of','with','what','without','not','who','as','an','but','it','would','on','a','an','then','the','to','by','be','need','so','you','through','that','more','that’s','his','her','there','their','was','in');
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

  },

  stringLastChar: function(string) {

    var lastCharOfString = string.toString().charAt(string.length - 1);
    return lastCharOfString;

  },
  probably: function(string1, string2, variance) {

    variance = variance || 2;
    
    return _.levenshtein(string1.toString().toLowerCase(),string2.toString().toLowerCase()) < variance;

  },

  extractStory: function (story) {

    var ideas = [];
    _.each(story.sequence, function(moment) {

      ideas = ideas.concat(_.values(moment));
    });
    return ideas;
  }

});

function Promise(params) {

  var promise = this;
  this.then = function(callback){
    promise.resolve = callback;      
  }

  this.resolve = this.callback || function(){};

}