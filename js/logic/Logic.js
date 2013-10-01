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
        if (logic.brain.whatIs(comment.subject, true) == seed) return true;
      })

    var conclusion = _.sample(allCommentsAboutSubject) || '';
    if (!conclusion) return '';
    var remark = logic.brain.speech.express.generality(conclusion.subject, conclusion.attribute);
    response = remark;

    return response || '';
  }

  logic.comment = function (moment, context) {

    var response = '';
    var applicableComments = logic.getComments(moment);
    var comment = _.sample(applicableComments);
    if (!comment) return '';

    var remark = logic.brain.speech.express.quality(comment.subject, comment.attribute);
    return remark || '';
  }

  logic.getComments = function (moment) {


    var applicableComments = [];

    _.each(attributes, function (attribute) {
      _.each(attribute.when, function (occasion) {


        var intersects = _.occasionInvokesAttribute(moment, occasion);
        if (intersects) {
          applicableComments.push({
            subject: _.crack(moment[occasion.applies || 'subject']),
            attribute: _.crack(attribute.word)
          });
        }

      })
    })

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