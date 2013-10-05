define(['angular','Lisa','lang/things','lang/attributes','lang/verbs'] , function (angular, Lisa, things, attributes, verbs) {

  return angular.module('lisaApp' , [])
   .controller('LisaController', ['$scope', function($scope) {


      var emily = new Lisa();
 
      emily.activate();


      emily.learn(things);
      emily.learn(attributes);
      emily.learn(verbs);

      var saying = {};

      $scope.saying = saying;
      saying.emilySaying = 'hello, shug';

      $scope.listenEmily = function(input) {
        saying.emilySaying = input;
        $scope.$apply();
      }

      emily.tap($scope.listenEmily)


      var richard = new Lisa();

      richard.activate();
 
      richard.learn(things);
      richard.learn(attributes);
      richard.learn(verbs);

      $scope.listenRichard = function(input) {
        saying.richardSaying = input;
        $scope.$apply();
      }


      richard.tap($scope.listenRichard)


  }])
});