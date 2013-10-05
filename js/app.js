define(['angular','Lisa','lang/things','lang/attributes','lang/verbs'] , function (angular, Lisa, things, attributes, verbs) {

  return angular.module('lisaApp' , [])
   .controller('LisaController', ['$scope', function($scope) {


      var emily = new Lisa();
 
      emily.activate();

      $scope.default = 'default';

      emily.learn(things);
      emily.learn(attributes);
      emily.learn(verbs);

      var saying = {};

      $scope.saying = saying;
      saying.emilySaying = 'hello, shug';

      $scope.listen = function(input) {
      //  console.log('listened... ',input);
        saying.emilySaying = input;
        $scope.$apply();
      }

      emily.tap($scope.listen)

/*
      var richard = new Lisa();
 
      richard.learn(things);
      richard.learn(attributes);
      richard.learn(verbs);
*/


  }])
});