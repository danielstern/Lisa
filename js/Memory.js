define("Memory", [""], function Memory() {

  return function Memory(brain) {

    var memory = this;
    memory.brain = brain;
    memory.short = new ShortTermMemory(memory);
    memory.long = new LongTermMemory(memory);

    memory.imprint = function(memories) {
      console.log("imprintng...",memories)
      memory.long.addStories(memories);
    }

  };

  function ShortTermMemory(memory) {

    var short = this;
    short.memory = memory;
    short.capacity = 1000;

    short.recentThings = [];

    short.anything = function (memory) {
      if (_.isEmpty(short.recentThings)) return false;
    }

    short.remember = function (memory) {

      if (!memory instanceof Array) memory = [memory]
      short.recentThings = short.recentThings.concat(memory);

    }

    short.recall = function (idea) {

      var recentThoughts = short.getRecentThoughts;
      var recalledMemories = _.filter(recentThoughts, function (thought) {
        return _.isEqual(thought, idea)
      });
      return recalledMemories;
    }

    short.scan = function (word) {

      var recentThoughts = short.getRecentThoughts;
      var relatedMemories = _.filter(recentThoughts, function (memory) { return _.stringContains(memory ,word)  });
      return relatedMemories;

    }

    short.getRecentThoughts = function() {
      return _.last(short.recentThings, short.capacity);
    }
  }

  function LongTermMemory(memory) {

    var brain = memory.brain;

    this.stories = []
    var longTerm = this;

    longTerm.addStories = function (stories) {
      longTerm.stories = longTerm.stories.concat(stories);
    }

    longTerm.getStories = function (seed) {
      
      var ex = brain.extractor;

      if (typeof seed == 'string') seed = brain.whatIs(seed);
      if (!seed) return console.warn('No seed.')

      var matchingStories = _.filter(this.stories, function (story) { return ex.storyMentionsSeed(story,seed);  })

      return matchingStories;
    }

    longTerm.getRandomStory = function (seed) {
      
      var stories = longTerm.getStories(seed);
      var story = _.sample(stories);
      return story;
    }
  }
})