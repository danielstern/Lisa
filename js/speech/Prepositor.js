function Prepositor(brain) {

	var pt = this;

  pt.preposit = function (word, context) {


    
    context = context || {};

    var idea;
    var preposit = pt.preposit;
    var speech = brain.speech;
    var returnSubject = '';

    if (word instanceof Array) word = word[0];

    if (_.str.include(word, '<')) {
        return pt.prepositBundle(word, context);
    }

    word = pt.splitAndCombine(word,context)
    // if preposit is passed an object instead of a string (works on either)
    if (_.isObject(word)) {
      idea = word;
      word = idea.word;
    }

    if (!word) return console.warn('No word.')

    word = pt.analythwack(word,context);

    

    if (typeof idea == 'string') idea = brain.whatIs(idea, true)

    idea = idea || brain.whatIs(word) || {isUnknown:true};
    word = word || idea.word;

    if (word == idea.plural) idea.pronoun = 'plural';

    if (context.pronoun && idea.pronoun != 'proper' && idea.pronoun != 'force') idea.pronoun = context.pronoun;

    if (context.pronoun == 'plural' && idea.plural) word = idea.plural;

    // if the idea is an adjective, give it no pronoun and grab a synonym of it, for fun
    if (idea.form == "adjective") {
      idea.pronoun = 'none' // context overrides idea
      word = speech.synonomize(idea.word);
    }

    // if the context suggests the word is referenced, and it is not a proper word, give it a referenced pronoun (it will conjugate with "the")
    if (context.referenced && idea.pronoun != 'proper' && idea.pronoun != 'force') idea.pronoun = 'referenced';
    if (idea.pronoun == 'proper') idea.word = _.capitalize(idea.word);

    // based on the idea object, choose a preposition
    var returnWord = true;
    var preposition = '';

    prepositionObj = pt.ideaToDefaultPrepositionObject(idea,context);
    preposition = prepositionObj.preposition;
    returnWord = prepositionObj.returnWord;
    returnSubject = prepositionObj.word || word;


    if (preposition) preposition += " ";

    var regex = /\d{1,2}:\d{2}/;    // NICE
    if (regex.exec(word)) {
      preposition = '';
    }

    var response = preposition + (returnWord ? returnSubject : '');

    response = pt.hack(response,context,idea);

    return response;

  }

  pt.hack = function(fragment,context,idea) {

    console.log('hacking',fragment,context,idea)

    if (context.assumed) {
      var objective = context.objective;
      if (idea.gender) {
        if (idea.gender == 'male') return objective ? 'him' : 'he';
        if (idea.gender == 'female') return objective ? 'her' : 'she';
        if (idea.gender == 'mixed') return objective ? 'them' : 'they';
      }
      return 'it';
    }

    if (fragment == 'me' && !context.objective && !context.asBundle) return 'I'; // English is a hacky language.
    if (fragment == 'i') return 'I';

    return fragment;

  }

  pt.analythwack = function(word,context) {

    if (word.split('|').length < 2) return word;

    var object = word.split('|')[1];
    var directive = word.split('|')[0];

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

    return word;
  }

  pt.splitAndCombine = function(string, context) {

    var preposit = pt.preposit;
    var objectContext = _.clone(context);
    
    if (!_.fizzle(string) || !_.fizzle(string).thing) return string;

    var property = _.fizzle(string).has;
    var word = _.fizzle(string).thing;

    var propertyIdea = brain.whatIs(property);
    if (!propertyIdea) return console.warn("Can't get idea about.." , property);

    if (propertyIdea.form != 'adjective') {
      context.pronoun = 'none';
    }

    if (propertyIdea.form == 'adjective') {
      propertyIdea.isAdjective = true;
      if (propertyIdea.noPronoun) context.pronoun = 'none';
      objectContext.pronoun = 'none';
    }
    
    word = preposit(property, { pronoun:'referenced' }) + (propertyIdea.isAdjective ? " " : ' of ') + preposit(word,objectContext);

    context.pronoun = none;
  
    return word;
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

  pt.ideaToDefaultPrepositionObject = function(idea, context) {

  	var prepositionObject = {};
    var prep = prepositionObject;

    prep.word = idea.word || undefined;
   
    switch (idea.pronoun) {
    case 'unique':
    case 'referenced':
      prep.preposition = 'the';
      prep.returnWord = true;
      break;
    case 'proper':
    case 'none':
    case 'force':
    case 'pluralize':
    case 'plural':
    case 'concept':
      prep.preposition = '';
      prep.word = idea.plural || idea.word;
      prep.returnWord = true;
      break;
    case 'self':
    case 'me':
      prep.preposition = 'I';
      prep.returnWord = false;
      break;
    default:
      switch (_.bare(_.first(idea.word || ''))) {
      case 'a':
      case 'e':
      case 'i':
      case 'u':
      case 'o':
        prep.preposition = 'an';
        prep.returnWord = true;
        break;
      default:
        prep.preposition = 'a';
        prep.returnWord = true;
      }
      break;
    }


    if (context.possessive) {
      switch (context.possessor) {
      case 'me':
      case 'self':
      case 'I':
        prep.preposition = 'my';
        break;
      case 'male':
        prep.preposition = 'his';
        break;
      case 'female':
        prep.preposition = 'her';
        break;
      default:
        prep.preposition = 'their'
        break;
      }
    }

    return prepositionObject;
  }
}