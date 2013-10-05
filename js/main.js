// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
    jquery: '../lib/jquery/jquery-2.0.3.min',
    underscore: '../lib/underscore/underscore-min',
    'underscore.string': '../lib/underscore/underscore.string.min',
    angular: '../lib/angular/angular.min',
    bootstrap: '../lib/bootstrap/bootstrap.min'
  },
  shim: {
  	 'underscore.string': {
	    exports: '_.str',
	  },
	  'underscore': {
	  	deps: ['underscore.string'],
	    exports: '_',
	    init: function(_str) {

	    	_.mixin(_str.exports());

	    }
	  },
	  'angular': {
	      exports: 'angular'
	  },
	},
	urlArgs: "k=" + parseInt(Math.random() * 1000).toString(16),
	priority: [
		'angular'
	],
});

require([
	"jquery",
	"app",
	"angular",

	"Lisa",
	"Memory",
	"Brain",
	"Extractor",
	"Factory",
	"Utility",

	"logic/Emotionalizer",
	"logic/Storyteller",
	"logic/MomentObject",
	"logic/Counterposer",
	"logic/Logic",

	"lang/attributes",
	"lang/things",
	"lang/verbs",

	"story/stories",

	"speech/Speech",
	"speech/Prepositor",
	"speech/Conjugator",
	"speech/Lexicator",
	"speech/Momento",

	], function($, app, angular) {

   //		console.log('its bootstrap time.');
   	 angular.bootstrap(document , ['lisaApp']);
		
	
})

