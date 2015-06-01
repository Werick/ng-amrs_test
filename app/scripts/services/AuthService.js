/**
 * Created by developer on 5/16/15.
 */
'use strict';

/**
 * @ngdoc function
 * @name ngAmrsTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ngAmrsTestApp
 */
angular.module('ngAmrsTestApp')

  .factory('AuthService', ['Base64', '$http', '$cookieStore', '$rootScope',
    function (Base64, $http, $cookieStore, $rootScope) {
      var service = {};

      service.Login = function(username, password, callback)
      {
        var authdata = Base64.encode(username + ':' + password);
        console.log(authdata);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        //var url = 'http://localhost:8080/openmrs/ws/rest/v1/concept?limit=2'
        var url2 = 'http://localhost:8080/openmrs/ws/rest/v1/concept?limit=2'
        var url = 'https://test1.ampath.or.ke:8443/amrs/ws/rest/v1/session'
        var url3 = 'http://localhost:8080/openmrs/ws/rest/v1/session'
        /* Use this for real authentication
         ----------------------------------------------*/
        $http.get(url2 /*, { username: username, password: password }*/)
           .success(function (data, response) {
              //console.log(data);
            //$scope.firstName=data;
              if (response==401)
              {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
                callback(response);
              }
            else
              {
                callback(data,response);
              }

            });



      }

      service.getUsers = function(callback)
      {
        var url2 = 'http://localhost:8080/openmrs/ws/rest/v1/user?limit=2'
        $http.get(url2)
          .success(function (data) {
            console.log(data);
            callback(data);

          });
      }

      service.SetCredentials = function (username, password)
      {
        console.log ("Setting user credentials ");
        var authdata = Base64.encode(username + ':' + password);

        console.log(authdata);
        $rootScope.globals = {
          currentUser: {
            username: username,
            authdata: authdata
          }
        }

        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        /*
          Alternative way to store your credentials
         $http.defaults.headers.common.Authorization = 'Basic ' + authdata;

         */
        $cookieStore.put('globals', $rootScope.globals);
      }

      service.ClearCredentials = function ()
      {
        console.log ("clearing user credentials ");
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic ';
      }

      return service;

    }
  ])

  .factory('Base64', function(){
    /* jshint ignore:start */

    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    return {
      encode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
      },

      decode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
          window.alert("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
          enc1 = keyStr.indexOf(input.charAt(i++));
          enc2 = keyStr.indexOf(input.charAt(i++));
          enc3 = keyStr.indexOf(input.charAt(i++));
          enc4 = keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }

          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
      }
    };
  } );

