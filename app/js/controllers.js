/* Controllers */

var photoControllers = angular.module('photoControllers', []);
/////////////////////////// Search Instagram by hashtag //////////////////////////
photoControllers.controller('TagCtrl', ['$scope', '$http',
// Search Form setup ///
  function ($scope, $http) {
    $scope.tagSearch = function(query) {
// API Request setup ///
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
      var URL = 'https://api.instagram.com/v1/media/search?';
      var request = {
        lat: $scope.lat,
        lng: $scope.lng,
        callback: 'JSON_CALLBACK',
        client_id: 'db407f272678438f8af287ae3110d714',
        distance: 2000,
        count: 50
      };
      $http({
        method: 'JSONP',
        url: URL,
        params: request
      }).
        success(function (data){
          var newDataSet = buildInstagramData(data);
          // console.log(data);
          console.log('API fetch successful');
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
  /**
   * buildInstagramData
   * @data - params from server call
   */
  function buildInstagramData(data) {
    var temp = [];
    var lat = $scope.lat;
    var lng = $scope.lng;
    for (var item in data.data) {
      var newObj = data.data[item];
      var p1 ={lat: newObj.location.latitude, lng: newObj.location.longitude};
      var p2 ={lat: lat, lng: lng};
      newObj.distance = getDistance(p1, p2);
      temp.push(newObj);
    }
    console.log('new object created with custom distance attribute');
    console.log(temp);
    return temp;
  }
// Haversine formula for measuring distance between two points
// http://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
  var rad = function(x) {
  return x * Math.PI / 180;
  };
  var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };
  }
]);
