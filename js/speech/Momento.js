function Momento(brain) {

  var mm = this;

  mm.wordToSeed = function(word) {
    return speech.prepositor.wordToSeed(word)
  }


  mm.moment = function(moment, context) {

    var response = '';
    context = context || new brain.ContextObject();
    context.objective = false;

    var speech = brain.speech;
    var preposit = speech.preposit;
    var conjugate = speech.conjugate;

    var whatIs = brain.whatIs;




  //  console.log('tell story moment...',moment,context);

  if (!moment) return "I can hardly think of anything.";

    if (moment.dialogue) {

     // console.log('this is a dialogue...');
      var dialogue = moment.dialogue;
      var firstSpeaking = true;

      _.each(dialogue.said, function(phrase) {
        var dialogueMoment = {};
        var first = dialogue.between.first;
        var second = dialogue.between.second;
        dialogueMoment.subject = (firstSpeaking ? first : second);
        dialogueMoment.action = ('say');
        dialogueMoment.to = (firstSpeaking ? second : first);
        firstSpeaking = !firstSpeaking;

        dialogueMoment.said = phrase;
       // console.log('new moment?',dialogueMoment);
        response += _.sample([express.moment(dialogueMoment,context),'"' + phrase + '"'])
      //  response += express.moment(dialogueMoment,context);
        response += brain.speech.hardPause();


      })

      return response;
    };


    switch (context.rel || moment.rel) {

    case 'but':
      response += _.sample(['but','however']);
      break;
    case 'so':
      response += _.sample(['so','then','thus']);
      break
    case 'then':
      response += _.sample(['then']);
      break;
    }

    // add a soft pause of necessary
    if ((context.rel || moment.rel) && response) response += "##lp";


    var subjectContext = _.clone(context);
    var subjectIdea = whatIs(_.crack(moment.subject, true)) || new brain.Seed();
    subjectContext.pronoun = subjectIdea.pronoun;
    response += preposit(moment.subject, subjectContext) + " " + conjugate(moment.subject, moment.action, context.time,'singular');


    context.objective = true;

    if (moment.object) {
      
      response += " " + preposit(moment.object, _.clone(context));
    }


    if (moment.what) {
      response += " " + moment.what + " ";
    }


    if (moment.down) {
      response += " down " + preposit(moment.down);
    }

    if (moment.over) {
      response += " over " + preposit(moment.over, _.clone(context));
    }


    if (moment.with) {
      response += " with " + preposit(moment.with, _.clone(context));
    }

    if (moment.at) {
      response += " at " + preposit(moment.at, _.clone(context));
    }

    if (moment.out) {
      response += " out of " + preposit(moment.out, _.clone(context));
    }


    if (moment.in) {
      response += " in " + preposit(moment.in, _.clone(context));
    }

    if (moment.on) {
      response += " on " + preposit(moment.on, _.clone(context));
    }

    if (moment.off) {
      response += " off " + preposit(moment.off, _.clone(context));
    }


    if (moment.against) {
      var pronoun = (isGeneral) ? 'plural':'singular'
      var againstContext = _.clone(context);
      againstContext.pronoun = pronoun;
      againstContext.main = true;
      againstContext.objective = true;
      response += " against " + preposit(moment.against, againstContext);
    }


    if (moment.to) {
    response += " to ";
     if (typeof moment.to != 'string') {
        console.log('this is an object.');
        var remark = mm.generateSentenceFragment(moment.to, _.clone(context));
        response += " " + remark + " ";
      } else {
       response += preposit(moment.to, _.clone(context));
     }
    }

    if (moment.from) {
      response += " from " + preposit(moment.from, _.clone(context));
    }


    if (moment.said) {
      response += brain.speech.lightPause();
      response += ' "' + moment.said  + '" ';
      response += brain.speech.hardPause();
    }

    if (moment.howMuch) {
      response += ' ' + preposit(moment.howMuch)  + ' ';
    }

    if (moment.during) {
      response += " during " + preposit(moment.during);
    }


    if (moment.too) {
          response += brain.speech.lightPause();
      response += " too ";
    }

    if (moment.when) {
      response += preposit(moment.off, _.clone(context));
    }


    return response;
  }

  mm.generateSentenceFragment = function(moment, context) {

    //console.log('generate sentance framgent...',moment,context)

    var preposit = brain.speech.preposit;
    var conjugate = brain.speech.conjugate;
    var getConjugatedVerb = brain.speech.conjugator.getConjugatedVerb;

    context.time = context.time || 'present';
   // context.plural = context.plural || 'plural';

    var subjectIdea = brain.whatIs(moment.subject) || new brain.Seed();
    var singularity = false;

    if (!subjectIdea) console.warn("No subjectIdea",moment,context);
    if (!subjectIdea.plural || subjectIdea.pronoun == 'proper') {
      context.pronoun = 'singular';
    }
    context.noAssume = true;

    var action = moment.action;
    var response = '';
    if (moment.subject) response += preposit(moment.subject, context) + " ";
    
    response += getConjugatedVerb(action, context.time, context.plural) + " ";

    if (moment.hasObjective()) response += moment.getObjectiveKey() + " ";
    if (moment.hasObjective()) response += preposit(moment.getObjectiveWord(), context) + " ";

    return response;

  }

   mm.generality = function (moment, context) {

    var wordToSeed = brain.speech.prepositor.wordToSeed;


    console.log('generality,', moment, context);

    var seed = moment.subject;
    var quality = moment.getObjectiveWord();

    seed = wordToSeed(seed);
    quality = brain.whatIs(quality);

    console.log('generality,', seed, quality );

    if (!seed || !quality) return "I'm not so sure..."

    context = context || new brain.ContextObject();;
    context.time = 'present';
    context.referenced = false;

    if (seed.plural) context.plural = true;

    var subjectWord = seed.plural || seed.word;
    var objectWord = quality.plural || quality.word;

    var generalMoment = new brain.mo();
    var gm = generalMoment;
    gm.subject = subjectWord;
    gm.object = objectWord;
    gm.action = 'is';

    var remark = mm.generateSentenceFragment(gm,context)
    return remark;
  }
}