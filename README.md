<h1>Lisa</h1>
<h2>Neuro-Computational Matrix</h2>
<p>Lisa is designed to be the basis of an intelligent conversation simulator that will ultimately allow NPCs in games to say different things, every time - and mean it!</p>
<p>Lisa has many other uses including teaching people to speak new languages, and simulating staff at kiosks.</p>
<p>Lisa is designed with extensibility in mind. The human mind is a complex thing, and it's always growing. Lisa's codebase has a conversational design...</p>

```javascript
    lisa.brain.ponder().then{function(thought)
    lisa.thinks(thought);
    // 'Apples are crunchy.'
}
```

<p>
	Lisa has several functions that naturally complement eachother. She can
	<ul>
		<li>Just Think of Something Random and Talk About It</li>
		<li>She can riff on something you say to her.
		</li>
	</ul>
</p>

```javascript
lisa.brain.ponder('dogs').then{function(thought)
  lisa.thinks(thought);
  // 'Dogs are domestic. Dogs are reliable.'
}
```
<p>Lisa is built with underscore.js!</p>
<h2>How It Works</h2>
<h3>Brain</h3>
<h4>Speech</h4>
<p>
  Lisa's speech module
</p>
<h4>Logic</h4>
<p>
  Logic is the controller to speech's view and lexicon's model.  
</p>
<h4>Emotion</h4>
<h4>Personality</h4>    
<h4>Memory</h4>    
<h5>Short Term Memory</h5>
<p>Prevents Lisa from saying the same thing twice, rambling, etc.</p>
<p>When Lisa says something, she stores the thought in her short term memory.</p>

```javascript
var thought = logic.demystify('cheese');
brain.memory.short.remember(thought);
```

<p>Before Lisa says something, she can see in her short term memory if she's said something.</p>


```javascript
if (brain.memory.short.recall(thought)) {
  brain.host.thinks("Oh, I just said that, didn't I... ");
  return;
};
```

<h5>Long Term Memory:</h5>
<p>Lisa's long term memories and personality that persist past the current session. Can use a database or local storage.</p>
<ul>
  <li>Lisa can add new ideas and connections to her lexicon with her long term memory.</li>
  <li>Lisa can remember things you were talking about in the past and reminisce about them.</li>
</ul>
<h4>Lexicon</h4>
<p>
  The Lexicon is an interchangeable module containing interrelating words and ideas. 
</p>

<h4>Psychic</h4>
<p>
  Sometimes, Lisa will be running on a web page where she can tap into the unlimited power of the internet. Lisa can use <i>psychic</i> to:
  <ul>
    <li>
      Look up words she doesn't understand and associate them with words in her lexicon
    </li>
    <li>
      Answer any question for you and even interact with web API's to become a personal assistant
    </li>
  </ul>

```javascript
brain.psychic.syphon('veritas').then(function(idea){
  brain.ponder(idea).then(function(thought)) {
    brain.host.thinks(thought);
    // LISA: Veritas is truth.
  }
}
});
```

</p>
