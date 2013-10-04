var Factory = function(brain) {

  this.MomentObject = function(moment) {

    moment = moment || {};
    var mo = this;

    _.extend(this,moment);

    this.getObjectiveWord = function() {
      return this.object || this.at;
    }

    this.getObjectiveKey = function() {
      if (this.at) return 'at';
      if (this.to) return 'to';
      if (this.object) return '';
    }

    this.hasObjective = function() {
      if (this.getObjectiveWord) return true;
    }
  }


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