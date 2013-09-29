_.mixin({
  stringWithout: function(string, characters) {

     if (typeof characters == 'string') characters = [characters];

     _.each(characters,function(character){
       string = string.replace(character, '');
     })

     return string;
  },

  lisaFormat: function(string, filter) {

    string = string.replace('##hp','##sp##hp##sp')

      var strings = string.split('##sp');
      strings = _.chain(strings)
        .without('')
        .map(function(string){
          if (string == '##hp') return ''

          string = filter.filterString(string);
          string = _.trim(string);
          string = _.without(string.split('##lp'),'').join(', ');
          string = _.capitalize(string);
          if (!_.endsWith(string, '.')) string = string + '.';
          if (string) string += " ";

          return string;
       })
       .value();

    string = strings.join('');

    return string;

  },

  occasionInvokesAttribute: function(moment, occasion) {

    var invoked = true;

    console.log('invoke attribute',moment, occasion)

        if (occasion.action) {
           if(occasion.action != moment.action) invoked = false;
        }
        if (occasion.object) {
           if(occasion.object != _.crack(moment.object)) invoked = false;
        }

    return invoked;
  },

  crack: function(string) {
    if (typeof string != 'string') return string;
    if (string.split('|').length > 1) {
      string = string.split('|')[1];
    }
    if (string.split(':').length > 1) {
      string = string.replace(/<>/gi,'')
      .split(':')[1]
    }

    //console.log('crack returning...',string)
    return string;
  },

  extractIdeas: function(statement) {

    statement = statement || '';
    ideas = statement.split(/[\s,;.:!?'"']+/);
    ideas = _.map(ideas,function(idea){return idea.toString().toLowerCase()});
    ideas = _.without(ideas, '','are','is','and','of','with','what','without','not','generally','who','as','from','well','an','but','after','he','she','although','after','before','it','would','on','a','an','then','the','to','by','be','need','so','you','through','that','more','that’s','his','her','there','their','was','in');
    return ideas;

  },

  stringContains: function(string, characters) {

    string = string || '';

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

    string1 = string1 || '';
    string2 = string2 || '';
    variance = variance || 0;
    return _.levenshtein(string1.toString().toLowerCase(),string2.toString().toLowerCase()) < variance;

  },

  bare: function(string) {

    string = string.replace(/[\s,;.:!?'"']+/,'');
    return string;

  },


  extractStory: function (story) {

    var ideas = [];
    _.each(story.sequence, function(moment) {

      ideas = ideas.concat(_.values(moment));
      ideas = _.map(ideas,function(idea){
        return _.crack(idea);
      });
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