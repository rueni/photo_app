'use strict';

/* App Module */

var photoApp = angular.module('photoApp', [
  'ngRoute',
  'photoControllers'
]);

photoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/welcome.html',
      }).
      when('/tag', {
        templateUrl: 'partials/tag.html',
        controller: 'TagCtrl'
      }).
      when('/location', {
        templateUrl: 'partials/location.html',
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
