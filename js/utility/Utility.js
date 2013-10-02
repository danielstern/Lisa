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

      if (occasion.subject) {
         if(occasion.subject != _.crack(moment.subject)) invoked = false;
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
      string = _.fizzle(string).thing;
    }

    return string;
  },

  fizzle: function(string) {
    if (!string) return false;
    if (typeof string != 'string' || string.split(':').length < 2) return string;
    var fizzle = {};
    var pieces = string.replace(/\$/gi,'')
      .split(':');
    fizzle.thing = pieces[1];
    fizzle.has = pieces[0];

    return fizzle;
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


  probably: function(string1, string2, variance) {

    string1 = string1 || '';
    string2 = string2 || '';
    variance = variance || 0;
    return _.levenshtein(string1.toString().toLowerCase(),string2.toString().toLowerCase()) < variance;

  },

  bare: function(string) {

    if (!string) return string;
    string = string.replace(/[\s,;.<>:!?'"']+/gi,'');
    string = string.toLowerCase();
    return string;

  },

  compare: function(string1, string2) {

    return _.bare(string1) == _.bare(string2);

  },


  concat: function(array, array2) {
    _.each(array2, function(ari) {
      array.push(ari);
    })
    array = array.concat(array2);
    return array.concat(array2);
  },


});