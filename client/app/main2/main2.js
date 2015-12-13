'use strict';

angular.module('nightlifeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main2', {
        url: '/main2',
        templateUrl: 'app/main2/main2.html',
        controller: 'Main2Ctrl',
        controllerAs: 'main2'
      });
  });
