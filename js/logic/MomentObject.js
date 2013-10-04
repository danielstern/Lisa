define("logic/MomentObject", [], function () {
  return function MomentObject(moment, brain) {

    moment = moment || {};
    this.isMoment = true;

    var usedKeys =[];
    this.resetUsedKeys = function() {
      usedKeys = [];
    }

  
    this.getObjectiveWord = function () {
      return moment.object || moment.at || moment.in ;
    }

    this.getNextObjectPair = function() {
   //   console.log('getnextobjectpair...',moment);
      var no = {};
      var keys = _.chain(moment)
                  .keys()
                  .without('subject','action','general')
                  .value();

      var nextKey = _.chain(keys)
                     .difference(usedKeys)
                     .first()
                     .value();

     no.key = nextKey;
     usedKeys.push(nextKey);

     no.object = moment[nextKey];
    // console.log('no?',no)

      return no;

    }

    this.getSubject = function () {
      return moment.subject;
    }

    this.setObjectPair = function (key,value) {
      moment[key] = value;
    }


    this.setSubject = function (thing) {
      moment.subject = thing;
    }

    this.setAction = function (verb) {
      moment.action = verb;
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