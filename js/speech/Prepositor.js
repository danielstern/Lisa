function Prepositor(brain) {

	var pt = this;

  pt.isBundle = function (string ) {
    return _.str.include(string, '<')
  }

  pt.wordToSeed = function (word) {
    var seed = brain.whatIs(word) || {};
    seed.word = word;
    return seed;
  }

  pt.preposit = function (seed, context) {

    context = context || {};

    var origSeed = seed;
    if (!_.isObject(seed)) seed = pt.wordToSeed(seed); 

    var preposit = pt.preposit;
    var speech = brain.speech;
    var response = '';

    if (pt.isBundle(seed.word)) return pt.prepositBundle(seed.word, context);
    if (pt.isCompound(seed.word)) response = pt.splitAndCombine(seed.word,context); 
    if (pt.hasPrefix(seed.word)) response = pt.handlePrefix(seed.word,context);


    if (origSeed = seed.plural) context.pronoun = 'plural';
    if (context.pronoun == 'plural') response = response || seed.plural || seed.word;

    if (seed.form == "adjective")   context.pronoun = 'none'
  

    var po = pt.ideaToPrepositionObject(seed,context);
    preposition = po.preposition;

    preposition += " ";

    var regex = /\d{1,2}:\d{2}/;    // NICE
    if (regex.exec(seed.word)) {
      preposition = '';
    }

    var response = preposition + (po.returnWord ? response : '');

    response = pt.hack(response,context,seed);

    return response;

  }

  pt.hack = function(fragment,context,seed) {

    if (context.assumed) {
      var objective = context.objective;
      if (seed.gender) {
        if (seed.gender == 'male') return objective ? 'him' : 'he';
        if (seed.gender == 'female') return objective ? 'her' : 'she';
        if (seed.gender == 'mixed') return objective ? 'them' : 'they';
      }
      return 'it';
    }

    if (fragment == 'me' && !context.objective && !context.asBundle) return 'I'; // English is a hacky language.
    if (fragment == 'i') return 'I';

    return fragment;

  }

  pt.hasPrefix = function(string) {
    return (string.split('|').length > 1)    
  }

  pt.handlePrefix = function(word,context) {
   // console.log('handleprefix',word,context)

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

    return object;
  }

  pt.isCompound = function(string) {
    if (!_.fizzle(string) || !_.fizzle(string).thing) return false;
    return true;
  }

  pt.compoundToTarget = function(string) {
    if (!_.fizzle(string) || !_.fizzle(string).thing) return string;
    return _.fizzle(string).thing;
  }


  pt.splitAndCombine = function(string, context) {

    var preposit = pt.preposit;
    var objectContext = _.clone(context);

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

  var PrepositionObject = function() {
    this.returnWord = true;
    this.preposition = '';
    this.word = 'no word use'
  }

  pt.ideaToPrepositionObject = function(idea, context) {

    console.log('idea to po,',idea,context)

  	var po = new PrepositionObject();

    //idea = idea || {};
    if (!idea) return po;

    if (context.referenced) context.pronoun = 'referenced';

    var pronoun;
    if (idea.pronoun == 'proper' || idea.pronoun == 'force'){
      pronoun = idea.pronoun;
    } else {
      pronoun = context.pronoun;
    }

   
    switch (pronoun) {
    case 'unique':
    case 'referenced':
      po.preposition = 'the';
      po.returnWord = true;
      break;
    case 'proper':
    case 'none':
    case 'force':
    case 'pluralize':
    case 'plural':
    case 'concept':
      po.preposition = '';
      po.word = idea.plural || idea.word;
      po.returnWord = true;
      break;
    case 'self':
    case 'me':
      po.preposition = 'I';
      po.returnWord = false;
      break;
    default:
      switch (_.bare(_.first(idea.word || ''))) {
      case 'a':
      case 'e':
      case 'i':
      case 'u':
      case 'o':
        po.preposition = 'an';
        po.returnWord = true;
        break;
      default:
        po.preposition = 'a';
        po.returnWord = true;
      }
      break;
    }


    if (context.possessive) {
      switch (context.possessor) {
      case 'me':
      case 'self':
      case 'I':
        po.preposition = 'my';
        break;
      case 'male':
        po.preposition = 'his';
        break;
      case 'female':
        po.preposition = 'her';
        break;
      default:
        po.preposition = 'their'
        break;
      }
    }

    return po;
  }
}