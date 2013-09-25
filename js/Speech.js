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
      response += (seed.plural || preposit(seed.word)) + " " + (seed.plural ? 'are' : 'is') + " " + quality;
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
          response = (seed.plural || preposit(seed.word)) + " " + (seed.plural ? 'are' : 'is') + " a kind of " + idea; 
          break;
        case 2:
          response = (seed.plural || preposit(seed.word)) + " " + (seed.plural ? 'are' : 'is') + " a type of " + idea; 
          break;
        case 5:
          response = (seed.plural || preposit(seed.word)) + " " + (seed.plural ? 'are' : 'is') + " a variety of " + idea; 
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
          response += "One kind of " + seed.word + " " + (idea.plural ? 'are' : 'is') + " " + (idea.plural || idea.word);
          break;
        case 2:
          response += "A kind of " + seed.word + " " + (idea.plural ? 'are' : 'is') + " " + (idea.plural || idea.word);
          break;
        case 5:
          response += "I consider " + (idea.plural || preposit(idea.word)) + " to be a kind of " + seed.word;
          break;
        default:
          break;
       }

      return response;
    }

    express.association = function(seed, idea) 
    {
      var response = '';
      response += (seed.plural || preposit(seed.word)) + " " + (seed.plural ? 'remind' : 'reminds') + " me of " + (idea.plural || preposit(idea.word));
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
            response += (subject.plural || preposit(subject.word)) + " and " + (object.plural || preposit(object.word)) + " are both " + trait;
          break;
        case 2:
            response += "Both " + (subject.plural || preposit(subject.word)) + " and " + (object.plural || preposit(object.word)) + " are " + trait;
          break;
        case 5:
           response += (subject.plural || preposit(subject.word)) + " and " + (object.plural || preposit(object.word)) + " are similar because they are both " + trait;
          break;
        default:
          break;
      }
      return response;
    }    


    var preposit = function(word) 
    {
      var preposition = '';

      switch (speech.host.brain.whatIs(word)['pronoun'])
      {
         case 'unique':
           preposition = 'the';
           break;
         case 'proper':
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

      return preposition + " " + word;
    }
  }


  speech.prettify = function(phrase) {
     
    phrase = _.capitalize(phrase);
    return phrase;
  }
}
