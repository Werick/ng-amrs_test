'use strict';

/**
 * @ngdoc function
 * @name ngAmrsTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngAmrsTestApp
 */
angular.module('ngAmrsTestApp')
  .controller('MainCtrl', ['$scope','Authentication',function ($scope,Authentication) {

  //  $scope.login = function(){
  //    Authentication.login($scope.username,$scope.password, function(data)
  //    {
   //     console.log(data);
   //   });
   // };

    //$scope.test=Authentication.getPatients().get(function(data){data;});
   // $scope.test=Authentication.getConcepts().get(function(data){data;});
      $scope.test=Authentication.getUsers().get(function(data){data;});

  }]);
