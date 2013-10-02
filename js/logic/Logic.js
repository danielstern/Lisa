function Logic(brain) {

  var logic = this;

  logic.counterposer = new Counterposer(brain);
  logic.storyteller = new Storyteller(brain);

  logic.tellStory = logic.storyteller.tellStory;
  logic.counterpose = logic.counterposer.counterpose;

  logic.getStoryExcerpt = logic.storyteller.getStoryExcerpt;

  logic.getComments = function (moment) {

    var lx = brain.speech.lexicator;
    var ex = brain.extractor;

    var applicableOccasions = ex.occasionsFromMoment(moment); 

    var comments = _.map(applicableOccasions, function(occasion) {
      var comment = new Comment(moment[occasion.applies],attribute.word);
      return comment;
    })

    return comments;
  }


  var Comment = function (subject, attribute) {

    subject = _.crack(subject);
    attribute = _.crack(attribute);

    this.subject = subject;
    this.attribute = attribute;
  }
}