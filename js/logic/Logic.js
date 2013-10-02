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

    var ex = brain.extractor;

    var stories = longTerm.getStories(_.crack(seed.word));
    var moments = ex.storiesToMoments(stories);
    console.log("moments?",moments);
    var allCommentsAboutSubject = _.chain(moments)
       .whomp(function(){return logic.getComments(moments)})
       .tap(function(comments){console.log('comments?',comments)})
       .filter(function(comment){if(comment && comment.subject && brain.whatIs(comment.subject).word == seed.word) return true;})
       .value();


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