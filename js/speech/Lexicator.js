define("speech/Lexicator", [], function () {
  return function Lexicator(brain) {
    var lx = this;
    lx.things = [];
    lx.allVerbs = {};

    lx.learn = function (words) {

      if(typeof words == 'string') words = [words];
      if(words.packageType == 'verbs') var isVerbs = true;

      if(isVerbs) {
        lx.absorbVerbs(words)
        return;
      }

      _.each(words, function (word) {
        lx.absorbThing(word);
      })

    }

    lx.absorbVerbs = function (verbs) {
      var verbPairs = _.pairs(verbs);
      _.each(verbPairs, function (verb) {
        lx.absorbVerb(verb[0], verb[1]);
      })
    }

    lx.absorbThing = function (word) {
      lx.things.push(word);
    }

    lx.absorbVerb = function (word, verb) {
      lx.allVerbs[word] = verb;
    }

    this.getVerbSynonyms = function (verb) {

      idea = lx.getVerbIdea(verb);
      if(!idea || !idea.synonyms) return [verb];
      var synonyms = idea.synonyms;
      return synonyms;

    }

    lx.synonomize = function (word) {

      var idea = brain.whatIs(word, true);

      if(_.isEmpty(idea.synonyms)) return word;
      var synonyms = idea.synonyms;
      var synonym = _.sample(synonyms.concat([word]));

      return synonym;
    }

    lx.getVerbIdea = function (verb) {

      if(!verb) return;

      var tl = lx.allVerbs;

      if(!_.has(tl, verb)) {
        return undefined;
      }

      var verbIdea = tl[verb];
      verbIdea.form = 'verb';

      return verbIdea;

    }

    lx.getWord = function (word) {
      if(!word) return;
      var ideas = _.filter(lx.things, function (wordIdea) {
        if(_.compare(wordIdea.word, word)) return true;
        if(_.compare(wordIdea.plural, word)) return true;
        if(_.compare(wordIdea.said, word)) return true;
      });

      if (_.isEmpty(ideas)) console.warn("Can't access word not in lexicon",word);  

      return ideas[0];

    }

    lx.getAllAttributes = function () {
      var allAttributes = [];
      allAttributes = _.filter(lx.things, function (wordIdea) {
        if(wordIdea.form == 'adjective') return true;
      });

      return allAttributes;

    }

    lx.getRandomWord = function () {

      var idea = _.sample(lx.things);
      return idea;

    }

  }
})