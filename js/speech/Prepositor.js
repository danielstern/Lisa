define("speech/Prepositor", [], function() {

return function Prepositor(brain) {

	var pt = this;


  pt.wordToSeed = function (word) {
    if (_.isObject(word)) return word;
    if (brain.whatIs(word) && !_.isSpecial(word)) return brain.whatIs(word);
    var seed = new brain.Seed();
    seed.word = word;
    return seed;
  }

  pt.compoundToIdea = function(string) {
    var target = _.compoundToTarget(string);
    var idea = brain.whatIs(target);
    return idea;
  },


  pt.preposit = function (seed, context) {

    if (!seed) return console.error('You cant preposit that',seed);

    context = context || new brain.ContextObject();
    if (!seed.isSeed) seed = pt.wordToSeed(seed); 


    var targetIdea = seed;
    var targetWord = seed.word;

    var preposit = pt.preposit;
    var speech = brain.speech;
    var response = '';

    if (_.isBundle(seed.word)) return pt.prepositBundle(seed.word, context);
    if (_.isCompound(seed.word)) response = pt.splitAndCombine(seed.word,context); 
    if (_.hasPrefix(seed.word)) response = pt.handlePrefix(seed.word,context);

    if (_.isSpecial(seed.word)) {
      targetWord = _.specialToTarget(seed.word);
      targetIdea = pt.wordToSeed(targetWord);
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

    if (context.assumed && !context.noAssume) {
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


  pt.splitAndCombine = function(string, context) {

    //console.log('split and combine...',string,context)

    var preposit = pt.preposit;

    var response;
    var objectContext = _.clone(context);
    var subjectContext = new brain.ContextObject();
      subjectContext.pronoun = 'referenced';


    var property = _.fizzle(string).has;
    var word = _.fizzle(string).thing;
    var targetWord = word;

    var propertyIdea = brain.whatIs(property);
    if (!propertyIdea) return console.warn("Can't get idea about.." , property);

    if (propertyIdea.form != 'adjective') {
      context.pronoun = 'none';
    }

    if (propertyIdea.form == 'adjective') {
      propertyIdea.isAdjective = true;
      objectContext.pronoun = 'none';
      objectContext.plural = true;
    }

    
    response = preposit(property, subjectContext) + (propertyIdea.isAdjective ? " " : ' of ') + preposit(targetWord,objectContext);

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



  pt.ideaToPrepositionObject = function(idea, context) {

  	var po = new brain.PrepositionObject();

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
      po.preposition = '';
    }

    return po;
  }
}
})