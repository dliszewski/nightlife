'use strict';

angular.module('nightlifeApp')
  .directive('footer', function () {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      link: function (scope, element) {
        element.addClass('footer');
      }
    };
  });
