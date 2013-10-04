var Factory = function(brain) {

  this.MomentObject = MomentObject;


  this.ContextObject = function(context) {

   // console.log('new context object')
    context = context || {};
    this.pronoun = context.pronoun;
    this.time = context.time;

    this.pronoun = undefined;
    this.time = undefined;
    this.referenced = undefined;

  }

  this.Seed = function () {
    var word = 'undefined_word';
  }


}