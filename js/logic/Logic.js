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

  logic.getStoryExcerpt = logic.storyteller.getStoryExcerpt;


  logic.drawConclusion = function (seed) {

    var response = '';

    var stories = brain.memory.long.getStories(_.crack(seed.word));
    var allComments = [];
    var extractor = brain.speech.express.extractor;


    _.each(stories, function (story) {
      var sequences = extractor.storyToMoments(story);
      _.each(sequences, function (moment) {
        var comments = logic.getComments(moment);
        allComments = allComments.concat(comments);

      })
    })

    var allCommentsAboutSubject = _.filter(allComments,
     function (comment) {
      if (!comment || !comment.subject) return false;
        if (logic.brain.whatIs(comment.subject).word == seed.word) return true;
    })

   // var conclusion = _.sample(allCommentsAboutSubject) || '';
    var conclusion = _.sample(allCommentsAboutSubject) || '';
   // console.log('expressing conclusion...',seed,stories,conclusion,allComments,allCommentsAboutSubject)
    if (!conclusion) return "I can't draw any conclusions.";
    var remark = logic.brain.speech.express.generality(conclusion.subject, conclusion.attribute);
    response = remark;

    return response;
  }

  logic.getComments = function (moment) {


    var applicableComments = [];

    var attributes = brain.speech.express.lexicator.getAllAttributes();

  //  console.log('Get comments,',moment,attributes)

    _.each(attributes, function (attribute) {
      _.each(attribute.when, function (occasion) {

       // console.log('Getting intersection,',attribute,occasion);

        var intersects = brain.speech.express.extractor.occasionInvokesAttribute(moment, occasion);
        if (intersects) {

    //    console.log('Found intersection,',attribute,occasion);
          applicableComments.push({
            subject: _.crack(moment[occasion.applies || 'subject']),
            attribute: _.crack(attribute.word)
          });
        }

      })
    })

 //   console.log('Get comments?',applicableComments);

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