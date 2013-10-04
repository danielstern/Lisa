function Momento(brain) {

  var mm = this;

  mm.wordToSeed = function(word) {
    return speech.prepositor.wordToSeed(word)
  }


  mm.moment = function(moment, context) {

    if (!moment) return "I can hardly think of anything.";
    if (!moment.isMoment) moment = brain.mo(moment);
    context = context || new brain.ContextObject();
    
    var response = '';
    var whatIs = brain.whatIs;
    var speech = brain.speech;
    var preposit = speech.preposit;
    var conjugate = speech.conjugate;
    var pt = brain.speech.prepositor;

    if (moment.dialogue)  return mm.toDialogue(moment); 

    response += (context.rel || moment.rel || '') + " ";
    if (response) response += "##lp";

    console.error('express moment',moment,context)

    var pejorative = 'singular';
    
    var trueSubject = pt.specialToTarget(moment.subject);
    var trueSubjectIdea = brain.whatIs(trueSubject);
    if (trueSubject == trueSubjectIdea.plural) pejorative = 'plural';
    console.log('true subject?',trueSubject)


    var subjectContext = _.clone(context);
    var subjectIdea = whatIs(_.crack(moment.subject)) || new brain.Seed();
    subjectContext.pronoun = subjectIdea.pronoun;

    response += preposit(moment.subject, subjectContext) + " " + conjugate(moment.subject, moment.action, context.time,'plural');

    response += moment.getObjectiveKey() + " " + preposit(moment.getObjectiveWord(),context);


    return response;
  }

  mm.toDialogue = function(moment) {

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
        response += _.sample([express.moment(dialogueMoment,context),'"' + phrase + '"'])
        response += brain.speech.hardPause();

      })

      return response;
  }



  mm.generateSentenceFragment = function(moment, context) {

    var preposit = brain.speech.preposit;
    var conjugate = brain.speech.conjugate;
    var getConjugatedVerb = brain.speech.conjugator.getConjugatedVerb;

    context.time = context.time || 'present';
    context.rel = undefined;


    var subjectIdea = brain.whatIs(moment.subject) || new brain.Seed();
    var singularity = false;
    
    context.noAssume = true;

    var response = mm.moment(moment,context)

    return response;

  }

   mm.generality = function (moment, context) {

//   console.error('generality,', moment, context);

    var wordToSeed = brain.speech.prepositor.wordToSeed;

    context = context || new brain.ContextObject();;
    context.time = 'present';
    context.referenced = false;
    

    var remark = mm.generateSentenceFragment(moment,context)
    return remark;
  }
}