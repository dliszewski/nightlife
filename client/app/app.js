'use strict';

angular.module('nightlifeApp', [
  'nightlifeApp.auth',
  'nightlifeApp.admin',
  'nightlifeApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
