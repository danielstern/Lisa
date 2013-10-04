define("logic/MomentObject", [], function () {
  return function MomentObject(moment, brain) {

    moment = moment || {};
    this.isMoment = true;

  
    this.getObjectiveWord = function () {
      return moment.object || moment.at || moment.in ;
    }

    this.getNextObject = function() {
      var no = {};
      no.key = '???';
      no.value = '???';

      return no;

    }

    this.getSubject = function () {
      return moment.subject;
    }

    this.getAction = function () {
      return moment.action;
    }

    this.getObjectiveKey = function () {
      console.log('getobjective key...',moment);
      if(moment.at) return ' at ';
      if(moment.to) return ' to ';
      if(moment. in ) return ' in ';
      if(moment.object) return '';
    }

    this.hasObjective = function () {
      if(moment.getObjectiveWord) return true;
    }

    this.getTrueSubject = function () {
      return _.specialToTarget(moment.subject)
    }

    this.getTrueSubjectIdea = function () {
      return brain.whatIs(this.getTrueSubject()) || new brain.factory.Seed();
    }

    this.getPejorative = function () {
      return(this.getTrueSubject() == this.getTrueSubjectIdea().plural) ? 'plural' : 'singular';
    }

  }
});