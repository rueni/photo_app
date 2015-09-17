'use strict';

/* App Module */

var photoApp = angular.module('photoApp', [
  'photoFilters',
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
        templateUrl: 'partials/search.html',
        controller: 'findUser'
      });
      otherwise({
        redirectTo: '/'
      });
  }]);
