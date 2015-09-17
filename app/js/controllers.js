/* Controllers */
/////////////////////////// Main logic for the app ///////////////////////////////
var photoControllers = angular.module('photoControllers', []);

/////////////////////////// Search Instagram by hashtag //////////////////////////
photoControllers.controller('TagCtrl', ['$scope', '$http',
// Search Form setup ///
  function ($scope, $http) {
    $scope.tagSearch = function(query) {
      $scope.querried = false;
      $scope.searched = query;
      if (!$scope.myForm.$valid) {
        $scope.error = true;
          return;
          }
          else {
            $scope.error = false;
          }
// API Request setup /// https://api.instagram.com/v1/tags/{tag-name}/media/recent?access_token=ACCESS-TOKEN
    var search = query.replace(/\s+/g, '_').toLowerCase();
    var url ='https://api.instagram.com/v1/tags/' + search + '/media/recent';
    var request = {
      callback: 'JSON_CALLBACK',
      client_id: 'db407f272678438f8af287ae3110d714',
      count: 50
    };
    $http({ method: 'JSONP', url: url, params: request }).
      success(function (data){
        $scope.images = data.data;
        $scope.querried = true;
        $scope.query = "";
      }).
      error(function () {
        $scope.querried = false;
        console.log('error');
      });
    };
  }]);

// /////////////////////////// Search Instagram by Location //////////////////////////

photoControllers.controller('findUser', function($scope, $window) {
  $window.navigator.geolocation.getCurrentPosition(function(position){
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    $scope.$apply(function() {
      $scope.lat = lat;
      $scope.lng = lng;
    });
  });
})
//
// photoControllers.controller('LocCtrl', ['$scope', '$http', '$window',
// // fetch user geolocation
// // Search Form setup ///
//   function ($scope, $http) {
//     $scope.locSearch = function(query) {
//       $scope.querried = false;
//       $scope.searched = query;
//       if (!$scope.myForm.$valid) {
//         $scope.error = true;
//           return;
//           }
//           else {
//             $scope.error = false;
//           }
// // API Request setup ////https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&?access_token=
//         var url = 'https://api.instagram.com/v1/media/search';
//         var request = {
//                 lat: lat, // fetch from geolocation
//                 lng: lng, // fetch from geolocation
//                 callback: 'JSON_CALLBACK',
//                 client_id: 'db407f272678438f8af287ae3110d714',
//                 count: 50
//         };
//         $http({method: 'JSONP' url: url, params: request }).
//           success(function (data){
//             $scope.images = data.data;
//             $scope.querried = true;
//             $scope.query = "";
//           }).
//           error(function () {
//             $scope.querried = false;
//             console.log('error');
//           });
//         };
//       ]);
