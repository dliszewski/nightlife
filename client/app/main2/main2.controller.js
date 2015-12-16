'use strict';

angular.module('nightlifeApp')
  .factory('CacheService', function($cacheFactory) {
    var cache = $cacheFactory('cacheService', {
      capacity: 1 // optional - turns the cache into LRU cache
    });

    return cache;
  })
  .controller('Main2Ctrl', function ($scope, $http, Auth,CacheService) {
    $scope.zalogowany = Auth.isLoggedIn();
    $scope.getCurrentUser = Auth.getCurrentUser();
    console.log($scope.getCurrentUser._id);
    $scope.updatedbars = [];
    console.log($scope);
    $scope.loading = false;
    $scope.bars = [];
    var dbbars = [];

    if(CacheService.get('location')!==undefined){
      $scope.location = CacheService.get('location');
      search();
    }

    $scope.search = function () {
      $scope.loading = true;
      CacheService.put('location',$scope.location);
      $http.get('/api/bars/location/' + $scope.location).success(function (data) {
        $scope.bars = data;
        updatepeoples($scope.bars);
        $scope.loading = false;
        console.log($scope.bars[1].peoples.length);
      });
    };

      $scope.join = function (bar) {
      console.log(bar._id);
      console.log(bar);
      if ($scope.getCurrentUser._id !== undefined) {
        if (bar._id !== undefined) {
          if (bar.peoples.indexOf($scope.getCurrentUser._id) === -1) {
            bar.peoples.push($scope.getCurrentUser._id);
            $http.put('/api/bars/'+bar._id, bar).success(function (data) {
              bar = data;
              console.log(data);
            })
          }
        } else{
          if (bar.peoples.indexOf($scope.getCurrentUser._id) === -1) {
            bar.peoples.push($scope.getCurrentUser._id);
            $http.post('/api/bars/', bar).success(function (data) {
              $scope.updatedbars.push(data);
              console.log(data);
            })
          }
        }
      } else {
        console.log('user niezalogowany');
      }
    };
    $scope.leave = function (bar) {
      if ($scope.getCurrentUser._id !== undefined) {
        _.pull(bar.peoples, $scope.getCurrentUser._id);
        console.log(bar);
        $http.put('/api/bars/'+bar._id, bar).success(function (data) {
          console.log(data);
        })
      } else {
        console.log('user niezalogowany');
      }
    };
    $scope.userAtt = function (bar) {
      return _.indexOf(bar.peoples, $scope.getCurrentUser._id) !== -1;
      //_.pull(bar.peoples,$scope.getCurrentUser._id);
    };

    function updatepeoples(bars) {
      $http.get('/api/bars/').success(function (data) {
        dbbars = data;
        $scope.bars = _.map(bars, barExistsInDB);
      });
    }

    function barExistsInDB(oldbar) {
      var newbar = _.findWhere(dbbars, {'name_id': oldbar.name_id});
      return newbar !== undefined ? newbar : oldbar;
    }

    function search(){
      $scope.loading = true;
      CacheService.put('location',$scope.location);
      $http.get('/api/bars/location/' + $scope.location).success(function (data) {
        $scope.bars = data;
        updatepeoples($scope.bars);
        $scope.loading = false;
        console.log($scope.bars[1].peoples.length);
      });
    }
  });
