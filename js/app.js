define(['angular','Lisa'] , function (angular, Lisa) {
	console.log('returning module...')
  return angular.module('lisaApp' , [])
   .controller('LisaController', ['$scope', function($scope) {

  	 	console.log("Initilaized app...")

      var $Lisa = new Lisa();
     _.defer(function learn(){
        $Lisa.learn(_things);
        $Lisa.learn(_attributes);
        $Lisa.learn(_sayings);
        $Lisa.learn(_verbs);
      })

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

     //   console.log('Reply',$scope.sayTo,directive);
        var reply = $Lisa.hears($scope.sayTo, directive);
        $scope.saying = reply;
   
     }
  }])
});