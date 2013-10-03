function Prepositor(brain) {

	var pt = this;

  pt.preposit = function (word, context) {

    var preposit = pt.preposit;

    var speech = brain.speech;
    context = context || {};
    if (word instanceof Array) word = word[0];

    if (_.stringContains(word, '<')) {
      	return pt.prepositBundle(word, context);
    }


    if (_.fizzle(word) && _.fizzle(word).thing) {
      var property = _.fizzle(word).has;
      word = _.fizzle(word).thing;

      //console.log('fizzle?',word,_.fizzle(word))

      var propertyIdea = brain.whatIs(property);

      if (propertyIdea) {

        if (propertyIdea.form != 'adjective') {
          context.pronoun = 'none';
        }

        if (propertyIdea.form == 'adjective') {
        	propertyIdea.isAdjective = true;
          if (propertyIdea.noPronoun) context.pronoun = 'none';
        }

      }

      var newWordContext = {};
      if (!propertyIdea) propertyIdea = {};
      if (propertyIdea.form == 'adjective') newWordContext.pronoun = 'none';
      
      word = preposit(property, {
        pronoun: 'referenced'
      }) + (propertyIdea.isAdjective ? " " : ' of ') + preposit(word,newWordContext);
      adjective = property;
    }

    // if preposit is passed an object instead of a string (works on either)
    var idea;
    if (word && typeof word == 'object') {
      idea = word;
      word = idea.word;
    }

    var adjective = '';
    word = word || '';

    if (word.split('|').length > 1) {
      var directive = word.split('|')[0];
      word = word.split('|')[1];

      switch (directive) {
      case 'my':
        context.possessive = true;
        context.possessor = 'self';
        break;
      case 'his':
        context.possessive = true;
        context.possessor = 'male';
        break;
      case 'her':
        context.possessive = true;
        context.possessor = 'female';
        break
      case 'possessive':
        context.possessive = true;
        break
      case 'referenced':
      case 'the':
      case 'main':
        context.referenced = true;
        break;
      case 'assumed':
        context.assumed = true;
        break;
      case 'force':
        context.pronoun = 'force';
        break;
      }
    }

    if (typeof idea == 'string') idea = brain.whatIs(idea, true)

    idea = idea || brain.whatIs(word, true) || {};
    word = word || idea.word;

    // if the word is the plural form of the word, give it a plural pronoun, i.e., "skeletons" automatically get a plural pronoun
    if (word == idea.plural) idea.pronoun = 'plural';

    // if the context suggest a pronoun, override the existing one if it is not 'proper' or 'force';
    if (context.pronoun && idea.pronoun != 'proper' && idea.pronoun != 'force') idea.pronoun = context.pronoun;

    // if the context suggest a plural pronoun, use the words plural in place of the word, if it has one
    if (context.pronoun == 'plural' && idea.plural) word = idea.plural;

    // if the idea is an adjective, give it no pronoun and grab a synonym of it, for fun
    if (idea.form == "adjective") {
      idea.pronoun = 'none'
      word = speech.synonomize(idea.word);
    }
   // console.log('Prepositing 2:', word, idea, context)

    // if the context suggests the word is referenced, and it is not a proper word, give it a referenced pronoun (it will conjugate with "the")
    if (context.referenced && idea.pronoun != 'proper' && idea.pronoun != 'force') idea.pronoun = 'referenced';
    if (idea.pronoun == 'proper') idea.word = _.capitalize(idea.word);

    // based on the idea object, choose a preposition
    var returnWord = true;
    var preposition = '';

    prepositionObj = pt.getPreposition(idea);
    preposition = prepositionObj.preposition;
    returnWord = prepositionObj.returnWord;

    if (context.possessive) {
      switch (context.possessor) {
      case 'me':
      case 'self':
      case 'I':
        preposition = 'my';
        break;
      case 'male':
        preposition = 'his';
        break;
      case 'female':
        preposition = 'her';
        break;
      default:
        preposition = 'their'
        break;
      }
    }

    // if the context suggests this words identity is assumed, replace it with the appropriate pronoun
    if (context.assumed) {
      var objective = context.objective;
      if (idea.gender) {
        if (idea.gender == 'male') return objective ? 'him' : 'he';
        if (idea.gender == 'female') return objective ? 'her' : 'she';
        if (idea.gender == 'mixed') return objective ? 'them' : 'they';
      }
      return 'it';
    }

    // add a space after the preposition, if it exists
    if (preposition) preposition += " ";

    var regex = /\d{1,2}:\d{2}/;    // NICE
    if (regex.exec(word)) {
     // console.log('this is a time');
      preposition = '';
    }
    else {
    //  console.log('this is not a time...')
    }

    var response = preposition + (returnWord ? word : '');
    if (response == 'me' && !context.objective && !context.asBundle) response = 'I'; // English is a hacky language.
    if (response == 'i') response = 'I';

   // console.log('Prepositing 2:', word, idea, context, response)
    return response;

  }

  
	pt.prepositBundle = function(bundle, context) {
		var words = bundle.replace(/[<>]/gi, '').split('&');
    var propositedWords = _.map(words, function (word) {
        var prepositContext = _.clone(context);
        prepositContext.asBundle = true;
        return pt.preposit(word, prepositContext)
    });

    propositedWords = _.toSentence(propositedWords);
    return propositedWords;
	}

  pt.getPreposition = function(idea) {

  	var prep = {};
  	prep.returnWord = true;

  	idea = _.clone(idea);
  	idea.word = idea.word || '';
   
    switch (idea.pronoun) {
    case 'unique':
    case 'referenced':
      prep.preposition = 'the';
      break;
    case 'proper':
    case 'none':
    case 'force':
    case 'pluralize':
    case 'plural':
    case 'concept':
      prep.preposition = '';
      break;
    case 'self':
    case 'me':
      preposition = 'I';
      prep.returnWord = false;
      break;
    default:
      switch (idea.word.toLowerCase().charAt(0)) {
      case 'a':
      case 'e':
      case 'i':
      case 'u':
      case 'o':
        prep.preposition = 'an';
        break;
      default:
        prep.preposition = 'a';
      }
      break;
    }

    return prep;

  }

//  window.preposit = pt.preposit;


}