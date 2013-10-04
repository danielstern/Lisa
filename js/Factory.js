var Factory = function(brain) {

  this.MomentObject = MomentObject;


  this.ContextObject = function(context) {

    context = context || {};
    this.pronoun = context.pronoun;
    this.time = context.time;

    this.pronoun = undefined;
    this.time = undefined;
    this.referenced = undefined;

  }

  this.Seed = function () {
    this.isSeed = true;
  }


}