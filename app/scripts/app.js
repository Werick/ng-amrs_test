'use strict';

/**
 * @ngdoc overview
 * @name ngAmrsTestApp
 * @description
 * # ngAmrsTestApp
 *
 * Main module of the application.
 */
angular.module('ngAmrsTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/testApi.html',
        controller: 'RestCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

//.config(function($httpProvider) {
    //Enable cross domain calls
  //  $httpProvider.defaults.useXDomain = true;
  //  $httpProvider.defaults.withCredentials = true;
    //Remove the header used to identify ajax call  that would prevent CORS from working
  //  delete $httpProvider.defaults.headers.common['X-Requested-With'];
 // });
  /*
   The app.run() method here is used to initialise the currentUser global variable from a cookie to keep the user logged in
   between page reloads, it also contains and an event handler to check if the user is logged in before each route change.
   */
  .run(function($http) {
    $http.defaults.headers.common.Authorization = 'Basic QWRtaW46QWRtaW4xMjM'
  });


