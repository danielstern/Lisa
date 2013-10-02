Lisa
====

## Short Term Memory

- Prevents Lisa from saying the same thing twice, rambling, etc.
- When Lisa says something, she stores the thought in her short term memory.

Before Lisa says something, she can see in her short term memory if she's said something.

```javascript
if (brain.memory.short.recall(thought)) {
  brain.host.thinks("Oh, I just said that, didn't I... ");
  return;
};
```

### `recall(thought)` 
Returns true if Lisa remembers saying the thought.

    brain.ponder('merlin');
    // LISA: Merlin is a wizard.
    brain.memory.short.recall('Merlin is a wizard.')
    // true;

### `scan(word)` 
Returns true if Lisa remembers having said that word at all within her short term memory.

    brain.memory.short.scan('profession');
    // false;
    brain.ponder();
    // LISA: My profession is spokesmatrix, honey.
    brain.memory.short.recall('profession');
    // true;

### `remember(thought)` 
Lisa remembers a thought for future recollection

    brain.memory.short.remember('kill bill');
    // lisa remembers to kill bill;

## Long Term Memory:
Lisa's long term memories and personality that persist past the current session. Can use a database or local storage.

+ Lisa can add new ideas and connections to her lexicon with her long term memory
+ Lisa can remember things you were talking about in the past and reminisce about them

Long term memory is where Lisa stores **stories** which are the basis of her neuro-computational matrix.

## Lexicon
The Lexicon is an interchangeable module containing interrelating words and ideas. 

```javascript
var Lexicon = {
  things:[
    {
      word:'orange',
      extends:['fruit'],
      plural:'oranges',
    },
  ]
}
```

### Fetching Words from Levixon

```
lexicon.getWord('road')
/*
{
  word:'road',
  plural:'roads',
  extends:['place'],
}
*/
```

### Things
Things in the lexicon represent nouns and are usually the subject or object in a moment.

```javascript
{
  word:'knight',
  gender:'male',
  extends:['warrior','person','soldier'],
  plural:'knights',
}
```

### Attributes
Attributes are applied to things in the lexicon.

```javascript
{
  word:'brave',
  when:[
    {action:'kill',object:'monster',applies:'subject'}
  ],
  form:'adjective'
  synonyms:['heroic','fearless']
}
```
