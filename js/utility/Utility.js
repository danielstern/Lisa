_.mixin({
  stringWithout: function(string, characters) {

     if (typeof characters == 'string') characters = [characters];

     _.each(characters,function(character){
       string = string.replace(character, '');
     })

     return string;
  },

  lisaFormat: function(string) {

    string = string.replace(/##hp/gi,'##sp##hp##sp')

      var strings = string.split('##sp');
      strings = _.chain(strings)
        .without('')
        .map(function(string){
          if (string == '##hp') return "</p><p>"

          string = _.trim(string);
          string = _.without(string.split('##lp'),'').join(', ');
          string = _.capitalize(string);
          //string = string + '.';
          if (_.stringNeedsClosure(string)) string = string + '.';
          if (string) string += " ";

          return string;
       })
       .value();

    string = strings.join('');

    return [string];

  },

  occasionInvokesAttribute: function(moment, occasion) {

    var invoked = true;


        if (occasion.action) {
           if(occasion.action != moment.action) invoked = false;
        }
        if (occasion.object) {
           if(occasion.object != _.crack(moment.object)) invoked = false;
        }

    return invoked;
  },

  crack: function(string, returnQuality) {
    if (typeof string != 'string') return string;
    if (returnQuality) return string.split('|')[0];
    if (string.split('|').length > 1) {
      string = string.split('|')[1];
    }
    if (string.split(':').length > 1) {
      string = _.fizzle(string);
    }

    return string;
  },

  fizzle: function(string) {
    string = string.replace(/\$/gi,'')
      .split(':')[1]
    ;
    return string;

  },

  oneToMany: function(string, returnQuality) {

 //   console.log('onetomany...',string)
     if (typeof string != 'string') return string;
     var many;

    if (string.indexOf('<') != -1 && string.indexOf('>') != -1) {

      string = string.split('<')[1].split('>')[0];
       if (string.split('&').length > 0) {
        many = string.replace(/\<|\>/gi,'')
         .split('&');
      }

  }

    return many || string;
  },


  extractIdeas: function(statement) {

    statement = statement || '';
    ideas = statement.split(/[\s,;.:!?'"']+/);
    ideas = _.map(ideas,function(idea){return idea.toString().toLowerCase()});
    ideas = _.without(ideas, '','are','is','and','of','me','with','what','without','not','generally','who','as','from','well','an','but','after','he','she','although','after','before','it','would','on','a','an','then','the','to','by','be','need','so','you','through','that','more','that’s','his','her','there','their','was','in');
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

  stringNeedsClosure: function(string) {

    var lastCharOfString = string.toString().charAt(string.length - 1);
    var pattern = /[.,"']/;
    var patternMatch = pattern.exec(lastCharOfString);

    return patternMatch ? false : true;

  },


  stringLastChar: function(string) {

    var lastCharOfString = string.toString().charAt(string.length - 1);
    return lastCharOfString;

  },

  getVerbSynonyms: function(verb) {
    var lexiary = window.transliterate;
    if(lexiary[verb]) var synonyms = lexiary[verb].synonyms;

    return synonyms;


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

  sluice: function(ideas){

    var newIdeas = [];

 //   console.log('sluice...', ideas)

    if (ideas instanceof Array) return _.seive(ideas);

     _.each(ideas,function(idea){

       //newIdeas =  newIdeas.concat(_.seive(idea));
       _.concat(newIdeas, _.seive(idea))

    });


    return newIdeas;
  },

  concat: function(array, array2) {
    _.each(array2, function(ari) {
      array.push(ari);
    })
    array = array.concat(array2);
    return array.concat(array2);
  },

  seive: function(idea) {

     idea = _.clone(idea);
     var ideaParts = _.oneToMany(idea);
       ideaParts = _.map(ideaParts,function(ideaPart) {
         return _.crack(ideaPart);
     });

      return ideaParts;

  },

  extractStory: function (story) {

    var ideas = [];
    if (!story) return ideas;
    if (_.has(story, 'epic')) {

        _.each(story.epic, function(parable) {

          _.each(parable.sequence, function(moment) {

     //        console.log('extract story',story,ideas,moment)
            ideas = ideas.concat(_.values(moment));
       
            });

        });
    }

    _.each(story.sequence, function(moment) {


      ideas = ideas.concat(_.values(moment));
     
    });

    ideas = _.sluice(ideas);
    //console.log('Extract Story',story,ideas)

    return ideas;
  }

});