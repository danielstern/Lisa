// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
    jquery: '../lib/jquery/jquery-2.0.3.min',
    underscore: '../lib/underscore/underscore-min',
    underscore_string: '../lib/underscore/underscore.string.min',
    angular: '../lib/angular/min',
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
});

require([
	"Lisa",
	"Memory",
	"Brain",
	"speech/Speech",
	"speech/Prepositor",
	"speech/Conjugator",
	/*
	"underscore",
	"logic/MomentObject",
	"logic/Counterposer",
	"logic/Emotionalizer",
	"logic/Logic",
	"logic/Storyteller",*/
	], function(Lisa) {
	console.log('Hi there.');
	var Lisa = new Lisa();
})

