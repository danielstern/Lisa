function Memory(brain) {

  var memory = this;
  memory.brain = brain;
  memory.short = new ShortTermMemory(memory);
  memory.long = new LongTermMemory(memory);

}

function ShortTermMemory(memory) {

  var short = this;
  short.memory = memory;
  short.capacity = 1000;

  short.recentThings = [];

  short.remember = function (memory) {

  //  return;

    if (memory instanceof Array) {
      short.recentThings = short.recentThings.concat(memory);
    } 
    else if (memory) {
      short.recentThings.push(memory);
    }

  }

  short.recall = function (memory) {

    var justNow = _.last(short.recentThings, short.capacity);
    var contains = _.contains(justNow, memory) || _.find(justNow, function (thought) {
      return _.isEqual(thought, memory)
    });
    return contains;
  }

  short.scan = function (word) {

    var justNow = _.last(short.recentThings, short.capacity);
    var memoryFilter = _.filter(justNow, function (memory) {
      return memory.toString().indexOf(word) != -1
    });

    return memoryFilter.length > 0;

  }
}

function LongTermMemory(memory) {
  stories = window._EmilyStories;
  this.stories = stories;
  var longTerm = this;

  longTerm.getStories = function (seed) {

    if (!seed) return {};
    if (typeof seed == 'string') seed = brain.whatIs(seed);

    var word = seed.word;
    var matchingStories = [];

    _.each(stories, function (story) {

      var ideas = brain.speech.express.extractor.extractStory(story);
      if (_.contains(ideas, word) || _.contains(ideas, seed.plural)) {

        matchingStories.push(story);

      }
    })

    return matchingStories;
  }
}