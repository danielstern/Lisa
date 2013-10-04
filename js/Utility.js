define("Utility", ['underscore','underscore.string'], function(_, _str) {
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

  log:function(){
  if(console){
      return console.log.apply(console, arguments);
    }
  },

  isSpecial:function(string) {
    if (_.isBundle(string) || _.isCompound(string) || _.hasPrefix(string)) return true;
  },

  isCompound:function(string) {
    if (!_.fizzle(string) || !_.fizzle(string).thing) return false;
    return true;
  },

  specialToTarget:function(string) {
    if (!string) return;
    return _.specialToObject(string).target;
  },

  hasPrefix:function(string) {
    return (string.split('|').length > 1);
  },

  isBundle:function (string ) {
    return _.str.include(string, '<');
  },


  crack: function(string, returnQuality) {
    if (!string) return;
    var obj = _.specialToObject(string);
   // console.log('crack',string,obj)
    return obj.target;
  },

  specialToObject: function(string) {
    var returnObj = {};

    if (typeof string != 'string') return string;
    if (string.split('|').length > 1) {
      returnObj.target = string.split('|')[1];
      returnObj.prefix = string.split('|')[0];
    }
    if (string.split(':').length > 1) {
      returnObj.target = _.fizzle(string).thing;
      returnObj.attribute = _.fizzle(string).attribue;
    }

    returnObj.target = returnObj.target || string;

    return returnObj;
  },

  whomp: function(filter,array) {
    return _.chain(array)
            .map(filter(array))
            .flatten()
            .value();
  },

  between: function(number,min,max) {
    return (number >= min && number <= max);
  },

  below: function(number,max) {
    return number <= max;
  },


  above: function(number,min) {
    return number >= min;
  },

  fizzle: function(string) {
    if (!string || !_.isString(string)) return console.warn("Can't fizzle this.",string);
    if (string.split(':').length < 2) return string;
    if (!_str.include(string, '$')) return string;
    var fizzle = {};
    var pieces = string.split(':');

    fizzle.thing = _.bare(pieces[1]);
    fizzle.has = _.bare(pieces[0]);

    return fizzle;
  },

  oneToMany: function(string, returnQuality) {

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


  endsWith: function(string, character) {

    var lastCharOfString = string.toString().charAt(string.length - 1);
    return lastCharOfString == character;

  },

  stringNeedsClosure: function(string) {

    var lastCharOfString = string.toString().charAt(string.length - 1);
    var pattern = /[.,?!:"']/;
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
    string = string.replace(/[\s,;.<$&>:!?'"']+/gi,'');
    string = string.toLowerCase();
    return string;

  },

  compare: function(string1, string2) {

    return _.bare(string1) == _.bare(string2);

  },
});
});