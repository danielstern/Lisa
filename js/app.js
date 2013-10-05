define(['angular','Lisa','lang/things','lang/attributes','lang/verbs'] , function (angular, Lisa, things, attributes, verbs) {

  return angular.module('lisaApp' , [])
   .controller('LisaController', ['$scope', function($scope) {


      var emily = new Lisa();
 
      emily.activate();

      emily.learn(things);
      emily.learn(attributes);
      emily.learn(verbs);

      emily.tap(function(output){
        console.log('Got output...',output);
      })

/*
      var richard = new Lisa();
 
      richard.learn(things);
      richard.learn(attributes);
      richard.learn(verbs);
*/


  }])
});