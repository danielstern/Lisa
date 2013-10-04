function Prepositor(brain) {

	var pt = this;

  pt.isBundle = function (string ) {
    return _.str.include(string, '<')
  }

  pt.wordToSeed = function (word) {
    if (brain.whatIs(word) && !pt.isSpecial(word)) return brain.whatIs(word);
    var seed = {};
    seed.word = word;
    return seed;
  }

  pt.isSpecial = function(string) {
    if (pt.isBundle(string) || pt.isCompound(string) || pt.hasPrefix(string)) return true;
  }

  pt.preposit = function (seed, context) {

    context = context || {};

    //if (!seed) console.error('You cant preposit that',seed);
    console.log('prepositing',seed,context);

    if (!_.isObject(seed)) seed = pt.wordToSeed(seed); 
    var targetIdea = seed;
    var targetWord = seed.word;

    var preposit = pt.preposit;
    var speech = brain.speech;
    var response = '';

    if (pt.isBundle(seed.word)) return pt.prepositBundle(seed.word, context);
    if (pt.isCompound(seed.word)) response = pt.splitAndCombine(seed.word,context); 
    if (pt.hasPrefix(seed.word)) response = pt.handlePrefix(seed.word,context);

    if (pt.isSpecial(seed.word)) {
      console.log('dealing with special word...',seed.word);
      targetWord = pt.specialToTarget(seed.word);
      console.log('targetWord...',targetWord);
      targetIdea = pt.wordToSeed(targetWord);
      console.log('targetIdea..',targetIdea);
    }


    if (targetWord == targetIdea.plural) context.pronoun = 'plural';
    if (context.pronoun == 'plural' || context.plural) response = response || targetIdea.plural || targetIdea.word;
 

    if (targetIdea.form == "adjective")   context.pronoun = 'none'
    response = response || targetWord;

    var po = pt.ideaToPrepositionObject(targetIdea,context);
    if (!po.returnWord) response = '';

    if (po.preposition) response = po.preposition + " " + response;

    response = pt.hack(response,context,targetIdea);

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

  pt.specialToTarget = function(string) {
    if (!string) return;
    return _.specialToObject(string).target;
  }

  pt.compoundToIdea = function(string) {
    var target = pt.compoundToTarget(string);
    var idea = brain.whatIs(target);
    return idea;
  }


  pt.splitAndCombine = function(string, context) {

    var preposit = pt.preposit;
    var objectContext = _.clone(context);

    var property = _.fizzle(string).has;
    var word = _.fizzle(string).thing;
    var targetWord = word;


    var response;

    var propertyIdea = brain.whatIs(property);
    console.log('split and comine...',string,property,targetWord, propertyIdea)
    if (!propertyIdea) return console.warn("Can't get idea about.." , property);

    if (propertyIdea.form != 'adjective') {
      context.pronoun = 'none';
    }

    if (propertyIdea.form == 'adjective') {
      propertyIdea.isAdjective = true;
      objectContext.pronoun = 'none';
      objectContext.plural = true;
    }

    
    response = preposit(property, { pronoun:'referenced' }) + (propertyIdea.isAdjective ? " " : ' of ') + preposit(targetWord,objectContext);

  
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

  var PrepositionObject = function() {
    this.returnWord = true;
    this.preposition = '';
    this.word = 'no word use'
  }

  pt.ideaToPrepositionObject = function(idea, context) {

  //  console.log('idea to po,',idea,context)

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
      break;
    case 'proper':
    case 'none':
    case 'force':
    case 'pluralize':
    case 'plural':
    case 'concept':
      po.preposition = '';
      break;
    case 'self':
    case 'me':
      po.preposition = 'I';
      break;
    default:
      switch (_.bare(_.first(idea.word))) {
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

    var regex = /\d{1,2}:\d{2}/;    // NICE
    if (regex.exec(idea.word)) {
      preposition = '';
    }

    return po;
  }
}