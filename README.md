<h1>Lisa</h1>
<h2>Neuro-Computational Matrix</h2>
<p>Lisa is designed to be the basis of an intelligent conversation simulator that will ultimately allow NPCs in games to say different things, every time - and mean it!<p>
<p>Lisa has many other uses including teaching people to speak new languages, and simulating staff at kiosks.</p>
<p>Lisa is designed with extensibility in mind. The human mind is a complex thing, and it's always growing. Lisa's codebase has a conversational design...
```
  lisa.brain.ponder().then{function(thought)
    lisa.thinks(thought);
    // 'Apples are crunchy.'
}
```
</p>
<p>
	Lisa has several functions that naturally complement eachother. She can
	<ul>
		<li>Just Think of Something Random and Talk About It</li>
		<li>She can riff on something you say to her.

					```
		  lisa.brain.ponder('dogs').then{function(thought)
		    lisa.thinks(thought);
		    // 'Dogs are domestic. Dogs are reliable.'
			}
			```

		</li>
	</ul>
</p>
<p>Lisa is built with underscore.js!</p>
<h3>How It Works</h3>
<ul>
  <li>Brain
  	<ul>
      <li>
      	<h4>Speech</h4>
      	<p>
      		Lisa's speech module
      	</p>
      </li>
      <li>
      	<h4>Logic</h4>
      	<p>
      		Logic is the controller to speech's view and lexicon's model.  
      	</p>
      </li>
      <li>Emotion</li>
      <li>Personality</li>
      <li>
      	<h4>Memory</h4>
      	<ul>
      		<li>
      			Short Term Memory: Prevents Lisa from saying the same thing twice, rambling, etc.
      		</li>
      		<li>
      			Long Term Memory: Lets Lisa collect new ideas, remember interactions for a long time, and associate ideas with new ideas and emotions.
      		</li>
      	</ul>
      </li>
      <li>
      	<h4>Lexicon</h4>
      	<p>
      		The Lexicon is an interchangeable module containing interrelating words and ideas. 
      	</p></li>
      <li>
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
        </p>
      <li>
    </ul>
  </li>  
</ul>