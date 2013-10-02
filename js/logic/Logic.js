function Logic(brain) {

  var logic = this;
  // var things = brain.lexicon.things;
  //  var attributes = brain.lexicon.attributes;
  logic.brain = brain;
  var response = '';

  logic.counterposer = new Counterposer(brain);

  var _lisaPatterns = ['tell-story'];

  logic.storyteller = new Storyteller(brain);
  logic.tellStory = logic.storyteller.tellStory;

  logic.counterpose = logic.counterposer.counterpose;


  logic.scopeUp = function (seed) {

    if (!seed.extends) return [response, seed];

    response = brain.speech.express.inheritance(seed, seed.extends);
    response += brain.speech.softPause();

    var scopeUpIdea = _.where(things, {
      word: seed.extends[0]
    });
    if (!scopeUpIdea[0]) think('I cant scope up to ' + seed.extends[0]);
    if (scopeUpIdea[0]) seed = scopeUpIdea[0];

    return [response, seed];
  }

  logic.scopeDown = function (seed) {

    var scopeDownIdea = _.filter(things, function (thing) {
      if (!thing.extends) return false;
      if (thing.word == seed.word) return false;
      if (thing.extends[0] == seed.word) return true;
      return false;
    })

    if (!scopeDownIdea) {
      return [response, seed];
    }

    if (scopeDownIdea[0]) {
      var idea = _.sample(scopeDownIdea);
      response = brain.speech.express.induction(seed, idea);
      response += brain.speech.softPause();
      seed = idea;
    }

    return [response, seed];
  }

  logic.getStoryExcerpt = function (seed) {

    var stories = brain.memory.long.getStories(seed);
    //console.log('getting story excerpt...',seed, stories);
    var excerpts = brain.speech.express.extractor.getRelevantMoments(stories,seed);

    var excerpt = _.sample(excerpts);

    var context = {};
    context.time = 'past';
    context.rel = 'once';
    var remark = brain.speech.express.moment(excerpt,context);
   // console.log('getting story excerpt...',seed, stories, excerpt,remark);
    //console.log('get story excerpt')

    return remark;

    
  }

  logic.scopeSideways = function (seed) {

    var response = '';

    if (!seed.extends) return [response, seed];
    var relatedThings = _.filter(brain.lexicon.things, function (thing) {
      if (!thing.extends) return false;
      if (thing.word == seed.word) return false;
      return thing.extends[0] == seed.extends[0]
    });

    if (!relatedThings || !relatedThings[0]) return [response, seed];

    var sidewaysIdea = _.sample(relatedThings);

    response += logic.brain.speech.express.inheritance([seed, sidewaysIdea], seed.extends[0]);

    if (!sidewaysIdea) return [response, seed];

    seed = sidewaysIdea;

    return [response, seed];
  }


  logic.drawConclusion = function (seed) {

    var response = '';

    var stories = brain.memory.long.getStories(_.crack(seed.word));
    var allComments = [];

    _.each(stories, function (story) {
      _.each(story.sequence, function (moment) {
        var comments = logic.getComments(moment);
        allComments = allComments.concat(comments);

      })
    })

    var allCommentsAboutSubject = _.filter(allComments,
     function (comment) {
        if (logic.brain.whatIs(comment.subject).word == seed.word) return true;
    })

    var conclusion = _.sample(allCommentsAboutSubject) || '';
    //console.log('expressing conclusion...',conclusion,allComments,allCommentsAboutSubject)
    if (!conclusion) return "I can't draw any conclusions.";
    var remark = logic.brain.speech.express.generality(conclusion.subject, conclusion.attribute);
    response = remark;

    return response;
  }

  logic.getComments = function (moment) {


    var applicableComments = [];

    var attributes = brain.speech.express.lexicator.getAllAttributes();

   // console.log('Get comments,',moment,attributes)

    _.each(attributes, function (attribute) {
      _.each(attribute.when, function (occasion) {

       // console.log('Getting intersection,',attribute,occasion);

        var intersects = _.occasionInvokesAttribute(moment, occasion);
        if (intersects) {

        console.log('Found intersection,',attribute,occasion);
          applicableComments.push({
            subject: _.crack(moment[occasion.applies || 'subject']),
            attribute: _.crack(attribute.word)
          });
        }

      })
    })

    console.log('Get comments?',applicableComments);

    return applicableComments;
  }


  /*
  Colliquilize: use cultural knowledge to reply appropriately.
  */
  logic.colloquilize = function (seed) {

    switch (seed.
      for) {
    case 'greeting':
      return brain.speech.express.greeting();
      break;
    case 'silence':
      return brain.speech.express.perceiveSilence();
      break;
    case 'insult':
      return brain.speech.express.offense();
      break;
    case 'parting':
      return brain.speech.express.parting();
      break;
    }
  }
}