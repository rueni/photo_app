/* Controllers */
/////////////////////////// Main logic for the app ///////////////////////////////

var photoControllers = angular.module('photoControllers', []);
/////////////////////////// Search Instagram by hashtag //////////////////////////
photoControllers.controller('TagCtrl', ['$scope', '$http',
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
    var search = query.replace(/\s+/g, '_').toLowerCase();
    var url ='https://api.instagram.com/v1/tags/' + search + '/media/recent';
    var request = {
      callback: 'JSON_CALLBACK',
      client_id: 'db407f272678438f8af287ae3110d714',
    };
    $http({
      method: 'JSONP',
      url: url,
      params: request
    }).
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
/////////////////// Location Based Search - NOT FUNCTIONAL...yet /////////////////////

photoControllers.controller('LocCtrl', ['$scope', '$http',
  function ($scope, $http) {
    var successCallback = function(resp, status, headers, config){
        console.log(resp);
        $scope.images = resp.data;
    };
    var searchImages = function(position){
        //https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&?access_token=249962630.f59def8.4c1defa23e9c4c8e969c299d84029f8e
        var config = {
            params: {
                lat: latitude,
                lng: longitude,
                callback: 'JSON_CALLBACK',
                count: 50
            }
        };
        $http.jsonp(instagram_search_url, config).success(successCallback);
    };
}]);
