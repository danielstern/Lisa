function Logic(brain) {

  var logic = this;
  // var things = brain.lexicon.things;
  //  var attributes = brain.lexicon.attributes;
  logic.brain = brain;
  var response = '';

  logic.counterpose = counterpose;
  window.logic = this;

  var _lisaPatterns = ['tell-story'];


  logic.tellStory = function (seed) {

    response = '';

    stories = brain.memory.long.getStories(seed);
    var story = _.sample(stories);

    var storyIdeas = _.shuffle(ex.extractStory(story));

    brain.memory.short.remember(storyIdeas);

//    console.log('tell story', seed)
    if (!story) return response;

    if (_.has(story, 'epic')) {

      var nextUntoldParable = _.find(story.epic, function (parable) {
        if (brain.memory.short.recall(parable)) return false;
        return parable;
      });

  //    console.log('next parable?',nextUntoldParable);


      if (!nextUntoldParable) {
        response += "I've told you all I know about " + seed.word;
      } else {

        brain.memory.short.remember(nextUntoldParable);
        _.each(nextUntoldParable.sequence, function (sequence) {

          var phrase = logic.tellStoryMoment(sequence);
          response += phrase;
          response += brain.speech.softPause();

        });
      }
    } 
    else {
      _.each(story.sequence, function (moment) {

        var phrase = logic.tellStoryMoment(moment);
        response += phrase;
        response += brain.speech.softPause();

     });
    }

    return response;
  }

  logic.tellStoryMoment = function (moment) {

    var phrase = '';
    if (!moment) return phrase;
    //console.log('tellstorymoment...',moment)
    // if (brain.memory.short.recall(moment)) return phrase;
    var context = moment.context || {};
    context.time = context.time || 'past';
    phrase = brain.speech.express.moment(moment, context);
    brain.memory.short.remember(moment);
    return phrase;
  }


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