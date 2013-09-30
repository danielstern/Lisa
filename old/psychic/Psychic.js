function Psychic() 
{
  var psychic = this;
  psychic.syphon = function(word, echo) {
  /*
      request = $.ajax({
        url: "http://thesaurus.altervista.org/thesaurus/v1?word="+word+"&language=en_US&key=hIr6Fw4nsnh4OWXOawky&output=json",
        type: "get",
        format: "jsonp",
        data: {}
    });

     request.done(function (response, textStatus, jqXHR){
        // log a message to the console
        console.log(response);
    });*/

	var s = document.createElement("script"); 
	s.src = "http://thesaurus.altervista.org/service.php?word="+word+"&language=en_US&output=json&key=hIr6Fw4nsnh4OWXOawky&callback=process"; // NOTE: replace test_only with your own KEY 
	document.getElementsByTagName("head")[0].appendChild(s);

		window.process = function process(result) { 
  			console.log(result);
  			var meaning = _.sample(result.response);
  			var synonyms = meaning.list.synonyms.split('|');
  			var category = meaning.list.category;
  			var idea = {
  				word:word,
  				is:synonyms
  			}
  			echo(idea);
	};	


	
  }
}
