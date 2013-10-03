function Momento(brain) {

  var mm = this;


  mm.moment = function(moment, context) {

    var response = '';
    context = context || {};
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

    // if the moment's context suggests it is a general moment, express it generally
    var isGeneral = (moment.context && moment.context.general);
    if (isGeneral) {

      var generalContext;
      if (!whatIs(moment.subject)) generalContext = 'plural';
      generalContext = generalContext || (whatIs(moment.subject) && whatIs(moment.subject).plural) ? 'plural' : 'singular';
      response += preposit(moment.subject,{pronoun:'plural'}) + " " + conjugate(moment.subject, moment.action, 'present', generalContext);
    } 
    else {

      var subjectContext = _.clone(context);
      var subjectIdea = whatIs(_.crack(moment.subject, true)) || {};
      subjectContext.pronoun = subjectIdea.pronoun;
      response += preposit(moment.subject, subjectContext) + " " + conjugate(moment.subject, moment.action, context.time,'singular');
    }

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

  //  console.log("Story moment",moment,context);

    return response;
  }

  mm.generateSentenceFragment = function(momentFragment, context) {

  var preposit = brain.speech.preposit;
  var conjugate = brain.speech.conjugate;
  var getConjugatedVerb = brain.speech.conjugator.getConjugatedVerb;

    context.time = context.time || 'present';
    context.plural = context.plural || 'plural';

    var subjectIdea = brain.whatIs(momentFragment.subject);
    var singularity = false;

    if (!subjectIdea) console.warn("No subjectIdea",context);
    if (!subjectIdea.plural || subjectIdea.pronoun == 'proper') {
      context.pronoun = 'singular';
    }

    var action = momentFragment.action;
    var response = '';
    if (momentFragment.subject) response += preposit(momentFragment.subject, context) + " ";
    if (momentFragment.action) response += getConjugatedVerb(momentFragment.action, context.time, context.plural) + " ";
    if (momentFragment.object) response += preposit(momentFragment.object, context) + " ";

    return response;

  }

   mm.generality = function (seed, quality, usePast) {
    var response = '';

    if (!seed || !quality) {
      return "I'm not so sure..."
      console.error('No seed or quality', seed, quality);
    }

    var context = {};
    context.time = 'present';
    context.plural = 'plural';

    var preposit = brain.speech.preposit;
    var conjugate = brain.speech.conjugate;

    var subjectWord = seed.plural || seed.word;
    var objectWord = quality.plural || quality.word;

    var remark = mm.generateSentenceFragment({subject:subjectWord, action:'is',object:objectWord},context)
    return remark;
    
/*
    if (typeof seed == 'string') seed = window.brain.whatIs(seed, true);

    var prepositedSubjects = '';
    if (seed instanceof Array) {
      var things = [];
      things = _.map(seed, function (miniSeed) {
        return preposit(miniSeed, {
          plural: true,
          pronoun: 'plural'
        });
      })

      prepositedSubjects = _.toSentence(things);

    }

    var context = 'singular';
    if (!seed || seed.plural) context = 'plural';

    var objectForm = 'plural';
    if (seed.pronoun == 'proper') objectForm = 'singular';
    if (prepositedSubjects) {
      response = prepositedSubjects + " " + conjugate('is', 'present', 'plural') + " " + preposit(quality, {
        pronoun: 'plural'
      });
    } else {

      response = preposit(seed, {
        pronoun: 'plural'
      }) + " " + conjugate('is', 'present', context) + " " + preposit(quality, {
        pronoun: objectForm
      });

    }*/

    return response;
  }
}