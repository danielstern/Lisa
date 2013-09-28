Lisa
====

```javascript
var lisa = new Lisa();
lisa.thinks('You know nothing, Jon Snow.');
// LISA: You know nothing, Jon Snow.
```

Neuro-Computational Matrix
--------------------------
<p>A neuro-computational matrix is a computer program that attempts to simulate the complex workings of the mind.</p>

<p>Lisa is designed to be the basis of an intelligent conversation simulator that will ultimately allow NPCs in games to say different things, every time - and mean it!</p>

```javascript
lisa.hears('sword').then(function(reply){
  $('body').html(reply);
});
// Swords are deadly.
```

<p>Lisa has many other uses including teaching people to speak new languages, and simulating staff at kiosks.</p>
<p>Lisa is designed with extensibility in mind. The human mind is a complex thing, and it's always growing. Lisa's codebase has a conversational design...</p>

```javascript
lisa.brain.ponder().then{function(thought)
    lisa.thinks(thought);
    // 'Apples are crunchy.'
}
```


Lisa has several functions that naturally complement eachother. She can
+ Talk about something random
+ Riff on something you say to her
+ Stick to a set pattern of behaviors (i.e., politely greeting visitors and answering questions)


```javascript
lisa.brain.ponder('dogs').then{function(thought)
  lisa.thinks(thought);
  // 'Dogs are domestic. Dogs are reliable.'
}
```
How It Works
------------
### Brain
Lisa's modular command center, the brain is the glue which holds Lisa's logic, memories and speech together.

#### Speech
Lisa's speech module allows Lisa to translate her ideas into something human beings can understand through `express()`.

```javascript
Lisa.thinks(Lisa.brain.speech.express.greeting());
// 'Hey there, sugar.'
```

#### Logic
Logic is the controller to speech's view and lexicon's model.  

##### `demystify(idea)`
Produces a thought about that idea.

```
var idea = _.sample(brain.things);
brain.logic.demystify(idea);
// Pears are healthy.

```

##### `scopeUp(idea)`

If the idea extends another idea, Lisa thinks about that instead.

```
// Lisa is thinking about wizards.
// LISA: Wizards are generally pretty old.
brain.logic.scopeUp(idea);
// LISA: Wizards are a kind of person.
// Lisa is now thinking about people.

```

##### `scopeDown(idea)`

If an idea extends this idea, Lisa thinks about that instead.

```
// Lisa is thinking about warriors.
// LISA: Warriors are mighty. I don't like warriors.
brain.logic.scopeDown(idea);
// LISA: Knights are a kind of warrior.
// Lisa is now thinking about knights.

```

#### Emotion
#### Personality    

#### Memory    
##### Short Term Memory
- Prevents Lisa from saying the same thing twice, rambling, etc.
- When Lisa says something, she stores the thought in her short term memory.

```javascript
var thought = logic.demystify('cheese');
brain.memory.short.remember(thought);
```
Before Lisa says something, she can see in her short term memory if she's said something.

```javascript
if (brain.memory.short.recall(thought)) {
  brain.host.thinks("Oh, I just said that, didn't I... ");
  return;
};
```

##### Short Term Memory Functions
###### `recall(thought)` 
Returns true if Lisa remembers saying the thought.

    brain.ponder('merlin');
    // LISA: Merlin is a wizard.
    brain.memory.short.recall('Merlin is a wizard.')
    // true;

###### `scan(word)` 
Returns true if Lisa remembers having said that word at all within her short term memory.

    brain.memory.short.scan('profession');
    // false;
    brain.ponder();
    // LISA: My profession is spokesmatrix, honey.
    brain.memory.short.recall('profession');
    // true;

###### `remember(remember)` 
Lisa remembers a thought for future recollection

    brain.memory.short.remember('buy milk');
    // lisa remembers this;

##### Long Term Memory:
Lisa's long term memories and personality that persist past the current session. Can use a database or local storage.

+ Lisa can add new ideas and connections to her lexicon with her long term memory
+ Lisa can remember things you were talking about in the past and reminisce about them

#### Lexicon
The Lexicon is an interchangeable module containing interrelating words and ideas. 

```javascript
var Lexicon = {
  things:[
    {
      word:'orange',
      is:['sweet','healthy','orange'],
      extends:['fruit'],
      plural:'oranges',
      associated:['apple'],
    },
  ]
}
```


#### Psychic

Sometimes, Lisa will be running on a web page where she can tap into the unlimited power of the internet. Lisa can use *psychic* to:

+ Look up words she doesn't understand and associate them with words in her lexicon
+ Answer any question for you and even interact with web API's to become a personal assistant


```javascript
brain.psychic.syphon('veritas').then(function(idea){
  brain.ponder(idea).then(function(thought)) {
    brain.host.thinks(thought);
    // LISA: Veritas is truth.
  }
}
});
```

