define(['angular','Lisa','lang/things','lang/attributes','lang/verbs'] , function (angular, Lisa, things, attributes, verbs) {

  return angular.module('lisaApp' , [])
   .controller('LisaController', ['$scope', function($scope) {


      var emily = new Lisa();
 
      emily.learn(things);
      emily.learn(attributes);
      emily.learn(verbs);
/*
      var richard = new Lisa();
 
      richard.learn(things);
      richard.learn(attributes);
      richard.learn(verbs);
*/


  }])
});