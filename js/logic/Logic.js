function Logic(brain) {

  var logic = this;

  logic.counterposer = new Counterposer(brain);
  logic.storyteller = new Storyteller(brain);

  logic.tellStory = logic.storyteller.tellStory;
  logic.counterpose = logic.counterposer.counterpose;

  logic.getStoryExcerpt = logic.storyteller.getStoryExcerpt;

  logic.drawConclusion = function (seed) {

    var response = '';
    var longTerm = brain.memory.long;

    var stories = longTerm.getStories(_.crack(seed.word));
    var allComments = [];
    var extractor = brain.extractor;

    _.each(stories, function (story) {
      var sequences = extractor.storyToMoments(story);
      _.each(sequences, function (moment) {
        var comments = logic.getComments(moment);
        allComments = allComments.concat(comments);

      })
    })

    var allCommentsAboutSubject = _.filter(allComments,
      function (comment) {
        if(!comment || !comment.subject) return false;
        if(logic.brain.whatIs(comment.subject).word == seed.word) return true;
      })

    var conclusion = _.sample(allCommentsAboutSubject) || '';
    if(!conclusion) return "I can't draw any conclusions.";
    var remark = logic.brain.speech.express.generality(conclusion.subject, conclusion.attribute);
    response = remark;

    return response;
  }

  logic.getComments = function (moment) {

    var lx = brain.speech.lexicator;
    var ex = brain.extractor;

    var applicableOccasions = ex.occasionsFromMoment(moment); 

    var comments = _.map(applicableOccasions, function(occasion) {
      var comment = new logic.comment(moment[occasion.applies],attribute.word);
      return comment;
    })

    return comments;
  }

  logic.comment = function (subject, attribute) {

    subject = _.crack(subject);
    attribute = _.crack(attribute);

    this.subject = subject;
    this.attribute = attribute;
  }
}