// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
    jquery: '../lib/jquery/jquery-2.0.3.min',
    underscore: '../lib/underscore/underscore-min',
    underscore_string: '../lib/underscore/underscore.string.min',
    angular: '../lib/angular/angular.min',
    bootstrap: '../lib/bootstrap/bootstrap.min'
  },
  shim: {
	  'underscore': {
	      exports: '_'
	  },
	  'angular': {
	      exports: 'angular'
	  },
	},
	urlArgs: "bust=" + new Date().getTime(),
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
	"logic/Emotionalizer",
	"logic/Storyteller",
	"logic/MomentObject",
	"logic/Counterposer",
	"logic/Logic",
	"speech/Speech",
	"speech/Prepositor",
	"speech/Conjugator",
	"speech/Lexicator",
	"Extractor",
	"Factory",
	"speech/Momento",
	/*
	"underscore",
	*/
	], function($, app, angular) {

   		console.log('its bootstrap time.');
   	 angular.bootstrap(document , ['lisaApp']);
		

 		 console.log('Hi there??.');
	
})

