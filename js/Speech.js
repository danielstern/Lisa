function Speech(host) {

  var speech = this;
  speech.host = host;
  speech.express = new Express;


  function Express() 
  {
    express = this;

    express.nonsense = function() 
    {
      return "I need scissors! 67!";
    }

    express.quality = function(seed, quality) 
    {
      var response = '';
      response += lexicate(seed) + " " + conjugate(seed, 'is') + " " + quality;
      return response;
    }

    express.inheritance = function(seed, idea) 
    {
      var response = '';

      switch (Math.ceil(Math.random()*5))
      {
        case 1:
        case 3:
        case 4:
          response = lexicate(seed) + " " + conjugate(seed, 'is') + " a kind of " + idea; 
          break;
        case 2:
          response = lexicate(seed) + " " + conjugate(seed, 'is')+ " a type of " + idea; 
          break;
        case 5:
          response = lexicate(seed) + " " + conjugate(seed, 'is') + " a variety of " + idea; 
        default:
          break;
      }
      return response;
    }

    express.induction = function(seed, idea) 
    {
      var response = '';

      switch (Math.ceil(Math.random()*5))
      {
        case 1:
        case 3:
        case 4:
          response += "One kind of " + seed.word + " " + conjugate(idea, 'is') + " " + lexicate(idea);
          break;
        case 2:
          response += "A kind of " + seed.word + " " + conjugate(idea, 'is') + " " + lexicate(idea);
          break;
        case 5:
          response += "I consider " + lexicate(idea) + " to be a kind of " + seed.word;
          break;
        default:
          break;
       }

      return response;
    }

    express.association = function(seed, idea) 
    {
      var response = '';
      response += lexicate(seed) + " " + (seed.plural ? 'remind' : 'reminds') + " me of " + lexicate(idea);
      return response;
    }

    express.sharedQuality = function(subject, object, trait) 
    {
      var response = '';
    
      switch (Math.ceil(Math.random()*5))
      {
        case 1:
        case 3:
        case 4:
            response += lexicate(subject) + " and " + lexicate(object) + " are both " + trait;
          break;
        case 2:
            response += "Both " + lexicate(subject) + " and " + lexicate(object) + " are " + trait;
          break;
        case 5:
           response += lexicate(subject) + " and " + lexicate(object)  + " are similar because they are both " + trait;
          break;
        default:
          break;
      }
      return response;
    }   

    /* Returns a string representing a friendly greeting. */
    express.greeting = function() 
    {
      var response = '';
    
      switch (Math.ceil(Math.random()*5))
      {
        case 1:
        case 3:
        case 4:
            response = "hello";
            break;
        case 2:
            response = "hey there, sugar";
             break;
        case 5:
             response = "hi";
          break;
        default:
          break;
      }
      return response;
    }  

    express.parting = function() 
    {
      var response = '';
    
      switch (Math.ceil(Math.random()*5))
      {
        case 1:
        case 3:
        case 4:
            response = "don't go";
            break;
        case 2:
            response = "bye for now";
             break;
        case 5:
             response = "won't you stay for a quick game of chess?";
            break;
        default:
          break;
      }
      return response;
    }        

    express.offense = function()
    {
       var response = '';
    
      switch (Math.ceil(Math.random()*5))
      {
        case 1:
        case 3:
        case 4:
            return "right back at you";
        case 2:
            return "your mother";
        case 5:
            return "i bet you're lonely, too";
        default:
          break;
      }
      return response;

    }

    express.perceiveSilence = function() {

      var response = '';
    
      switch (Math.ceil(Math.random()*5))
      {
        case 1:
        case 3:
        case 4:
            response = "Yes?";
            break;
        case 2:
            response = "Why don't you say something?";
             break;
        case 5:
             response = "...";
          break;
        default:
          break;
      }
      return response;
    }

    var lexicate = function(seed) {

       var response = '';
       response += (seed.pronoun == 'unique' ? preposit(seed.word) : (seed.plural || preposit(seed.word)));

       return response;
    }

    var conjugate = function(seed, verb) {

       var response = '';
       if (seed.pronoun == 'unique');
       response += (seed.pronoun == 'unique' ? preposit(seed.word) : (seed.plural || preposit(seed.word)));

      switch (verb) {
        case 'is':
          if (seed.pronoun == 'unique') return 'is';
          if (!seed.plural) return 'is';
            return 'are';
          break;
        default:
          return '?'
      }

       return response;
    }


    var preposit = function(word) 
    {
      var preposition = '';
      var pronoun = '';

      /* no longer works with async pattern */
      if (!speech.host.brain.whatIs(word,true)) {

        pronoun = '?';

      }

      switch (pronoun || speech.host.brain.whatIs(word,true)['pronoun'] )
      {
         case 'unique':
           preposition = 'the';
           break;
         case 'proper':
         case 'concept':
           preposition = '';
           break;
         default:
         switch(word.toLowerCase().charAt(0))
         {
           case 'a':
           case 'e':
           case 'i':
           case 'u':
           case 'o':
             preposition = 'an';
             break;
          default:
            preposition = 'a';
         }
         break;
      }

      if (preposition) preposition += " ";
      return preposition + word;
    }
  }


  speech.prettify = function(phrase) {
     
    phrase = _.capitalize(phrase);
    return phrase;
  }
}
