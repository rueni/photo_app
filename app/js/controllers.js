/* Controllers */

var photoControllers = angular.module('photoControllers', []);
/////////////////////////// Search Instagram by hashtag //////////////////////////
photoControllers.controller('TagCtrl', ['$scope', '$http',
// Search Form setup ///
  function ($scope, $http) {
    $scope.tagSearch = function(query) {
// API Request setup ///
// https://api.instagram.com/v1/tags/{tag-name}/media/recent?access_token=ACCESS-TOKEN
    var search = query.replace(/\s+/g, '_').toLowerCase();
    var URL ='https://api.instagram.com/v1/tags/' + search + '/media/recent';
    var request = {
      callback: 'JSON_CALLBACK',
      client_id: 'db407f272678438f8af287ae3110d714',
      count: 50
    };
    $http({
        method:'JSONP',
        url:URL,
        params:request
      }).
        success(function (data){
          $scope.images = data.data;
          $scope.results = true;
          $scope.query = "";
      }).
        error(function () {
          $scope.results = false;
          console.log('error');
      });
    };
  }]);


///////////////////////////// Search Instagram by Location ///////////////////////
//////////////////////////////////////////////////////////////////////////////////
photoControllers.controller('LocCtrl', ['$scope','$window', '$http',
// click to retrieve user location
function($scope, $window, $http) {
  $scope.ButtonClick = function() {
    var t = navigator.geolocation.getCurrentPosition(function(data) {

      var lat = data.coords.latitude;
      var lng = data.coords.longitude;

      $scope.$apply(function() {
        $scope.lat = lat;
        $scope.lng = lng;
      });

      $scope.visible = true;
      $scope.toggle = function() {
        $scope.visible = !$scope.visible;
      }
// API Request setup ///
// https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=ACCESS-TOKEN
      var URL = 'https://api.instagram.com/v1/media/search?';
      var request = {
        lat: $scope.lat,
        lng: $scope.lng,
        callback: 'JSON_CALLBACK',
        client_id: 'db407f272678438f8af287ae3110d714',
        count: 50
      };
      $http({
        method: 'JSONP',
        url: URL,
        params: request
      }).
        success(function (data){
          console.log(data);
          $scope.images = data.data;
          $scope.results = true;
          $scope.query = "";
      }).
        error(function () {
          $scope.results = false;
          console.log('error');
        });
      });
    };
  }
]);
