/**
 * Created by developer on 5/22/15.
 */
angular.module('ngAmrsTestApp')
  /*
  In order to consume restful apis data usin angularjs you are adviced to use $resource for getting data from rest api
  refer from https://docs.angularjs.org/api/ngResource/service/$resource for guidance
   */
.factory('Authentication', ['$resource','$http','$location',
    function($resource,$http,$location){
      var service={};
      service.currentUser={};
      var users={};
      var authdata='';

      var url='https://test1.ampath.or.ke:8443/amrs/ws/rest/v1/';

      service.login = function(username, password, callback)
      {
        authdata=btoa(username + ':' + password);
        getSession();
        url='http://localhost:8080/openmrs/ws/rest/v1/user';
        $http.get(url)
          .success(function(data,status){
            if(status!=401)
            {
              console.log(data);
              users=data;
              $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
              $location.path('views/about.html');
            }
            else
            {
              $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            }

        })
          .error(function(){
            //clear authentication
            $http.defaults.headers.common['Authorization'] = 'Basic '
          });



        //console.log(callback);
      };

      var getSession = function () {
        return $resource(url+'session');
      }
      service.url=''


      service.getConcepts = function()
      {
        getSession().get();
        var url2 = 'http://localhost:8080/openmrs/ws/rest/v1/concept?limit=2';
        return $resource(url2);
      }

      service.getUsers = function()
      {
        authdata=btoa('username' + ':' + 'password');
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        return $resource(url+'user?q=werick');
      }

      service.testGetUsers = function()
      {
        authdata=btoa('werick' + ':' + 'Sylvia@ericks1');
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        var v = 'full';
        return $resource(url+'user/:uuid',{uuid:'824e9d9c-8b9d-46c2-acdc-b48da392f3a3'},{query:{method:'GET',isArray:false}});
      }




      service.getPatients = function()
      {
        //getSession().get();
        authdata=btoa('werick' + ':' + 'Sylvia@ericks1');
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        var url2 = 'http://localhost:8080/openmrs/ws/rest/v1/patient?q=kanyari';
        //return $resource(url2,{uuid:'@uuid'},{'query': {method: 'GET', isArray: false}});
        return $resource(url+'patient?q=test');
      }

      return service;

    }]);
