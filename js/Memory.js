function Memory(brain) {

  var memory = this;
  memory.brain = brain;
  memory.short = new ShortTermMemory(memory);
  memory.long = new LongTermMemory(memory);

}

function ShortTermMemory(memory) {

  var short = this;
  short.memory = memory;
  short.capacity = 25;

  short.recentThings = [];

  short.remember = function(memory) {

    short.recentThings.push(memory);
    
  }

  short.recall = function(memory) {
    
    var justNow = _.last(short.recentThings,short.capacity);

    var contains = _.contains(justNow, memory) || _.find(justNow,function(thought){
      return _.isEqual(thought,memory)
    });
    return contains;
  }

  short.scan = function(word) {

    var justNow = _.last(short.recentThings,short.capacity);
    var memoryFilter = _.filter(justNow, function(memory){return memory.toString().indexOf(word) != -1});

    return memoryFilter.length > 0;

  }
}

function LongTermMemory(memory) {
  var stories = window._stories;
  var longTerm = this;

  longTerm.getStories = function(seed) {

    if (!seed) return {};

    var word = seed.word;
    var matchingStories = [];

    _.each(stories, function(story){

      var ideas = _.extractStory(story);
      if (_.contains(ideas,word))   {

        matchingStories.push(story);
        console.log('found match',ideas,word)
      } 
      
    })

    return matchingStories;

  }
}