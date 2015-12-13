'use strict';

angular.module('nightlifeApp.auth', [
  'nightlifeApp.constants',
  'nightlifeApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
