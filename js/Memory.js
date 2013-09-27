function Memory(brain) {

  var memory = this;
  memory.brain = brain;
  memory.short = new ShortTermMemory(memory);

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
    
    var justNow = _.last(short.recentThings,short.capacity)
    var contains = _.contains(justNow, memory);
    return contains;
  }

  short.scan = function(word) {

    var justNow = _.last(short.recentThings,short.capacity);
    var memoryFilter = _.filter(justNow, function(memory){return memory.toString().indexOf(word) != -1});

    return memoryFilter.length > 0;

  }
}