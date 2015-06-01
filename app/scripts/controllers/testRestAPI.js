/**
 * Created by developer on 5/5/15.
 */
/**
 * @ngdoc function
 * @name ngAmrsTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngAmrsTestApp
 *
 */

angular.module('ngAmrsTestApp')

  .controller('RestCtrl',['$injector', '$scope', '$rootScope', '$location', 'AuthService',
    function($injector, $scope, $rootScope, $location, AuthService){
      // reset login status
      //var AuthService = $injector.get('AuthService');
      AuthService.ClearCredentials();

      var username = 'Admin'
      var password = 'Admin123'
      //AuthService.SetCredentials(username,password);
      AuthService.Login(username, password, function(response) {
        console.log(response);
        AuthService.getUsers();
        if(response.success) {
          //AuthService.SetCredentials(username, password);
          //$location.path('/');
          console.log("Service getting here")

        } else {
          $scope.error = response.message;
          console.log("Right login error message: "+response.message);
        }
      });

  }]);
