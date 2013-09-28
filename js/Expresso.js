var Expresso = function(brain) 
  {
    express = this;
    express.brain = brain;

    express.learn = function(expression,operation) {
    	express['expression'] = operation;
    }


    express.nonsense = function() 
    {
      return "I need scissors! 67!";
    }

    express.quality = function(seed, quality) 
    {
      response = lexicate(seed) + " " + conjugate(seed, 'is') + " " + quality;
      return response;
    }

    express.possessive = function(key, value) 
    {
      response = "My " + key + " is " + value;
      return response;
    }

    express.personalTrait = function(trait) 
    {
      response = "I'm " + trait;
      return response;
    }

    express.incomprehension = function() 
    {    
      switch (Math.ceil(Math.random()*9))
      {
        case 1:
          response = "I don't know";
          break;
        case 2:
          response = "I have no idea"
          break;
        case 3:
          response = "I haven't any idea"
          break;
        case 4:
          response = "I don't understand";
          break;
        case 5:
          response = "Umm... ";
          break;
        case 7:
          response = "... ";
          break;
        case 8:
          response = "I'm sorry, but... ";
          break;
        case 9:
          response = "Oh... ";
          break;
        default:
          break;
      }
      return response;
    }  

    express.inheritance = function(seed, idea) 
    {
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
      switch (Math.ceil(Math.random()*4))
      {
        case 1:
        case 3:
         // response += lexicate(idea) + " " + conjugate(idea, 'is') +" " + lexicate(seed);
         // break;
        case 4:
          response = "One kind of " + seed.word + " " + 'is' + " " + lexicate(idea);
          break;
        case 2:
          response = "A kind of " + seed.word + " " + 'is' + " " + lexicate(idea);
          break;
        /*case 5:
          response += "I consider " + lexicate(idea) + " to be a kind of " + seed.word;
          break;*/
        default:
          break;
       }

      return response;
    }

    express.association = function(seed, idea) 
    {
      response = lexicate(seed) + " " + conjugate(seed, 'reminds') + " me of " + lexicate(idea);
      return response;
    }

    express.moment = function(moment, context) 
    {
      response = lexicate(moment.subject) + " " + conjugate(moment.subject, moment.action, context.time) + " " + lexicate(moment.object);
      return response;
    }

    express.association = function(seed, idea) 
    {
      response = lexicate(seed) + " " + conjugate(seed, 'reminds') + " me of " + lexicate(idea);
      return response;
    }

    express.relationship = function(seed, relationship) 
    {
      if (!relationship) return response;
      response = lexicate(seed)  + " " + verbalize(seed,relationship) + " " + preposit(relationship.object);
      return response;
    }


    express.sharedQuality = function(subject, object, trait) 
    {
      switch (Math.ceil(Math.random()*4))
      {
        case 1:
        case 3:
        case 4:
            response = lexicate(subject) + " and " + lexicate(object) + " are both " + trait;
          break;
        case 2:
            response = "Both " + lexicate(subject) + " and " + lexicate(object) + " are " + trait;
          break;
        /*case 5:
           response += lexicate(subject) + " and " + lexicate(object)  + " are similar because they are both " + trait;
          break;*/
        default:
          break;
      }
      return response;
    }   


    /* Returns a string representing a friendly greeting. */
    express.greeting = function() 
    {
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

     /* Returns the sort of greeting you might expect from the service industry. */
    express.formalGreeting = function() 
    {
      switch (Math.ceil(Math.random()*4))
      {
        case 1:
          response = "Hello and welcome";
          break;
        case 2:
          response = "Thank you for visiting us today";
          break;
        case 3:
            response = "Welcome";
            break;
        case 4:
            response = "Thank you for coming, as always.";
             break;
          break;
      }
      return response;
    }  


     /* Returns a string representing a human utterance for 'Just give me a sec...'. */
    express.pause = function() 
    {
      switch (Math.ceil(Math.random()*9))
      {
        case 1:
          response = "Hmmm... ";
          break;
        case 2:
          response = "Ah... "
          break;
        case 3:
          response = "Hmm... "
          break;
        case 4:
          response = "Hmmm... ";
          break;
        case 5:
          response = "Uh... ";
          break;
        case 7:
          response = "... ";
          break;
        case 8:
          response = "And... ";
          break;
        case 9:
          response = "Oh... ";
          break;
        default:
          break;
      }
      return response;
    }  

    /*
      Expresses a good-bye.
    */
    express.parting = function() 
    {
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

    /*
      Expresses a sentiment intended to offend the listener.
    */
    express.offense = function()
    {
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



	express.conjugate = function(seed, verb, tense) {

	   if (typeof seed == 'string') seed = brain.whatIs(seed);

	   tense = tense || 'present';
	   //if (seed.pronoun == 'unique');
	   //response += (seed.pronoun == 'unique' ? preposit(seed.word) : (seed.plural || preposit(seed.word)));

	   var tl = transliterate;
	   var context = 'plural';
	   if (seed.pronoun == 'unique') context = 'singular';
	   if (!seed.plural) context = 'singular';

	   var verb = tl[verb][tense][context];
	   response = verb;


	   return response;
	}


	express.verbalize = function(seed,relationship) {

	  var response = '';


	  switch (relationship.action) {
	    case 'weakness':
	      response = conjugate(seed, 'is') + ' weak against'
	      break;
	    case 'rule':
	      response = conjugate(seed, 'is') + ' ruler of';
	      break;
	    case 'use':
	    response = conjugate(seed,'use');
	      break;
	  }

	   return response;
	}




	express.lexicate = function(seed) {

	   if (typeof seed == 'string') seed = {word:seed};
	   response = (seed.pronoun == 'unique' ? preposit(seed.word) : (seed.plural || preposit(seed.word)));

	   return response;
	}

    express.preposit = function(word){

	  var preposition = '';
	  var pronoun = '';

	  word = word || '';

	  var idea = express.brain.whatIs(word,true);

	  if (!idea) {

	     idea = {pronoun:''}

	  }


	  if (word == idea.plural) idea.pronoun = 'pluralize';

	 
	  var returnWord = true;
	  switch (idea['pronoun'] )
	  {
	     case 'unique':
	       preposition = 'the';
	       break;
	     case 'proper':
	     case 'none':
	     case 'pluralize':
	     case 'concept':
	       preposition = '';
	       break;
	     case 'self':
	       preposition = 'I';
	       returnWord = false;
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
	  return preposition + (returnWord ? word : '');

	}
	var preposit = express.preposit;
    var lexicate = express.lexicate;
    var verbalize = express.verbalize;
    var conjugate = express.conjugate;
}