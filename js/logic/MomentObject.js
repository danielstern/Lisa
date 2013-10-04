function MomentObject(moment) {
	    moment = moment || {};
    var mo = this;
    this.isMoment = true;

    _.extend(this,moment);

    this.getObjectiveWord = function() {
      return this.object || this.at || this.in;
    }

    this.getObjectiveKey = function() {
      if (this.at) return ' at ';
      if (this.to) return ' to ';
      if (this.in) return ' in ';
      if (this.object) return '';
    }

    this.hasObjective = function() {
      if (this.getObjectiveWord) return true;
    }

    this.getTrueSubject = function() {
    	return brain.speech.prepositor.specialToTarget(this.subject)
    }

    this.getTrueSubjectIdea = function() {
    	return brain.whatIs(mo.getTrueSubject());
    }

    this.getPejorative = function() {
    	return (mo.getTrueSubject() == mo.getTrueSubjectIdea().plural) ? 'plural' : 'singular';
    }
}