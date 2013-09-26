_.mixin({
     capitalize: function(string) {
      var strings = string.split('//');
      strings = _.without(strings, '');

      strings = _.map(strings, function(string){
        string = string.charAt(0).toUpperCase() + string.substring(1);  
        //string = string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();  
        string += ('. ');
        //if (Math.random() > 0.1) string += "</p><p>"; 
        return string;
      })
      var returnString = strings.join('');
      return returnString;
  }
});

function Promise(hereIsAMethod) {
 var promise = this;
 promise.callback = hereIsAMethod;
 console.log('PROMISE: ' + 'Initializing,' , hereIsAMethod);

  return {
      then:function(callThisMethodWhenDone){
        promise.callback = callThisMethodWhenDone; 
        hereIsAMethod = callThisMethodWhenDone; 
     
      },
      word:this
    }

}