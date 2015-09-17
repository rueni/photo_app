'use strict';

/* Filters */
// converts UNIX time to normal
var photoFilters = angular.module('photoFilters', []).
    filter('unixTimeFilter', function(){
        return function(time){
            return new Date(time * 1000);
        }
    });
