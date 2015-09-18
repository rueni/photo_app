'use strict';

/* Filters */
var photoFilters = angular.module('photoFilters', []).

  filter('unixTimeFilter', function(){
      return function(time) {
        return new Date(time * 1000);
      }
    }).
  filter('distance', function () {
    return function (input) {
        if (input >= 1000) {
          return input/1000 + ' km';
      } else {
          return input + ' m away';
        }
      }
    })
