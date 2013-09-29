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
    if (!story) return ideas;
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

(function($){
  function injector(t, splitter, klass, after) {
    var a = t.text().split(splitter), inject = '';
    if (a.length) {
      $(a).each(function(i, item) {
        inject += '<span class="'+klass+(i+1)+'">'+item+'</span>'+after;
      }); 
      t.empty().append(inject);
    }
  }

  var methods = {
    init : function() {

      return this.each(function() {
        injector($(this), '', 'char', '');
      });

    },

    words : function() {

      return this.each(function() {
        injector($(this), ' ', 'word', ' ');
      });

    },

    lines : function() {

      return this.each(function() {
        var r = "eefec303079ad17405c889e092e105b0";
        // Because it's hard to split a <br/> tag consistently across browsers,
        // (*ahem* IE *ahem*), we replace all <br/> instances with an md5 hash 
        // (of the word "split").  If you're trying to use this plugin on that 
        // md5 hash string, it will fail because you're being ridiculous.
        injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
      });

    }
  };

  $.fn.lettering = function( method ) {
    // Method calling logic
    if ( method && methods[method] ) {
      return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
    } else if ( method === 'letters' || ! method ) {
      return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
    }
    $.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
    return this;
  };

})(jQuery);