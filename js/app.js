define(['angular','Lisa','lang/things','lang/attributes','lang/verbs'] , function (angular, Lisa, things, attributes, verbs) {

  return angular.module('lisaApp' , [])
   .controller('LisaController', ['$scope', function($scope) {


      var lisa = new Lisa();
   
        lisa.learn(things);
        lisa.learn(attributes);
        lisa.learn(verbs);


      $scope.handleMenuClick = function(thing) {

      //  console.log('menu click...',thing);
        $scope.sayTo = thing;
        $scope.reply('story-excerpt');

      }

      $scope.saying = '...';
      $scope.things = [
        'Money',
        'Store',
        'Shoe',
        'Mall',
        "Emily's Convenience",
        "Lexy's",
      ]

      $scope.sayTo = _.sample($scope.things);

      $scope.reply = function(directive) {

        var reply = lisa.hears($scope.sayTo, directive);
        $scope.saying = reply;
   
     }
  }])
});