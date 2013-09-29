function Logic(brain) {

  var logic = this;
  var things = brain.lexicon.things;
  var attributes = brain.lexicon.attributes;
  logic.brain = brain;
  var think = brain.host.thinks;
  var response = '';

  logic.demystify = function (seed, numberOfQualities) {

    response = '';

    switch (Math.ceil(Math.random() * 3)) {
    case 1:
      response = logic.scopeUp(seed)[0];
      break;
    case 2:
      response = logic.scopeSideways(seed)[0];
      break;
    case 3:
      response = logic.scopeDown(seed)[0];
      break;
    }

    response += brain.speech.softPause();

    return response;
  }

  logic.ponder = ponder;
  window.logic = this;

  logic.demystifyPersonality = function (being) {

    var response = '';
    being = being || 'self';

    var quality;
    var relationship;

    switch (Math.ceil(Math.random() * 2)) {
    case 1:
      quality = _.sample(brain.personality.ego.qualities);
      response = brain.speech.express.personalTrait(quality);
      break;
    case 2:
      relationship = _.sample(brain.personality.ego.relationship);
      response = brain.speech.express.relationship(relationship);
      break;
    }

    response += brain.speech.softPause();
    return response;
  }

  logic.expressRelationship = function (seed) {


    if (!seed.relationship || !seed.relationship[0]) {
      return response;
    }

    var relationship = _.sample(seed.relationship);

    response = brain.speech.express.relationship(seed, relationship);
    response += brain.speech.softPause();

    return response;

  }

  logic.shareEgo = function (being) {

    being = being || 'self';

    var traits = _.pairs(brain.personality.ego.identity);
    var trait;

    if (!brain.memory.short.scan(brain.personality.ego.identity.name)) {
      trait = _.find(traits, function (trait) {
        return trait[0] == 'name'
      });
    }

    trait = trait || _.sample(traits);

    response = brain.speech.express.possessive(trait[0], trait[1]);
    response += brain.speech.softPause();

    return response;
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
      think('I cant scope down from ' + seed.word);
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

  logic.compare = function (seed) {

    if (!seed.is) return response;

    for (var i = 0; i < brain.mood.inquisitive; i++) {
      var trait = _.sample(seed.is);
      var thing = _.sample(things);

      if (_.contains(thing.is, trait) && thing.word != seed.word) {
        response += brain.speech.express.sharedQuality(seed, thing, trait);
        response += brain.speech.softPause();
        return response;
      }
    }

    response += brain.speech.softPause();

    return response;
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

    if (!sidewaysIdea) return [response, seed];

    seed = sidewaysIdea;

    return [response, seed];
  }


  logic.comment = function (moment, context) {

    var response = '';
    var applicableComments = [];

      //  console.log('commenting on',moment)



    _.each(attributes, function (attribute) {
      _.each(attribute.when, function (occasion) {

//        console.log('moment?',moment);

        var intersects = _.occasionInvokesAttribute(moment, occasion);
        if (intersects) {
          applicableComments.push({
            subject: moment[occasion.applies || 'subject'],
            attribute: attribute.word
          });
        }

      })
    })

 //   console.log('comments',applicableComments)
    var comment = _.sample(applicableComments);

    if (!comment) return '';

    var remark = logic.brain.speech.express.quality(comment.subject, comment.attribute);

    return '';
    return remark || '';
  }

  logic.drawConclusion = function (seed) {

    var response = '';
  
    console.log('drawing conclusion about...',seed);
    var stories = brain.memory.long.getStories(seed);
    console.log('stories?',stories);
    var allComments = [];

    _.each(stories,function (story){
      _.each(story.sequence,function(moment) {
       // console.log('drawing conclusion from moment...',moment);
        var comments = logic.getComments(moment);
        allComments = allComments.concat(comments);

       })
   })

    console.log('allComments?',allComments);
    var allCommentsAboutSubject = _.filter(allComments,
      function(comment){
        if (logic.brain.whatIs(comment.subject,true) == seed) return true;})

    console.log('allCommentsAboutSubject?',allCommentsAboutSubject);

    var conclusion = _.sample(allCommentsAboutSubject) || '';
    if (!conclusion) return '';
    var remark = logic.brain.speech.express.quality(conclusion.subject, conclusion.attribute);
    response = remark;

    return response || '';
  }

  logic.getComments = function (moment) {

    var applicableComments = [];

    _.each(attributes, function (attribute) {
      _.each(attribute.when, function (occasion) {

//        console.log('moment?',moment);

        var intersects = _.occasionInvokesAttribute(moment, occasion);
        if (intersects) {
          applicableComments.push({
            subject: moment[occasion.applies || 'subject'],
            attribute: attribute.word
          });
        }

      })
    })

    return applicableComments;
  }

  logic.tellStory = function (seed) {

    response = '';
    response += brain.speech.hardPause();

    stories = brain.memory.long.getStories(seed);
    var story = _.sample(stories);

    if (!story) return response;

    _.each(story.sequence, function (moment) {
      var phrase = tellStoryMoment(moment);
      response += phrase;
      response += brain.speech.softPause();
      var comment = logic.comment(moment);
      if (comment && !brain.memory.short.recall(comment)) {

        brain.memory.short.remember(comment);

        response += comment;
        response += brain.speech.softPause();

      }
    });

    function tellStoryMoment(moment) {

      var phrase = '';
      if (!moment) return phrase;
      if (brain.memory.short.recall(moment)) return phrase;
      phrase = brain.speech.express.moment(moment, {
        time: 'past'
      });
      brain.memory.short.remember(moment);
      return phrase;
    }

    return response;
  }

  /*
  Induct
  consider a seed(A) scopeUp (to B), demystify, and then conclude that A must also have that property because A is B.
  */

  /*
  Contrast
  note how two things share a trait do not share a like trait
  */

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
      brain.host.thinks('Silence?');
      return brain.speech.express.perceiveSilence();
      break;
    case 'insult':
      brain.host.thinks('How dare you!');
      return brain.speech.express.offense();
      break;
    case 'parting':
      return brain.speech.express.parting();
      break;
    }
  }
}