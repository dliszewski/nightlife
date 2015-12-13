'use strict';

angular.module('nightlifeApp')
  .controller('Main2Ctrl', function ($scope,$http) {
    $http.get('/api/things/bars').success(function(data){
      console.log(data);
      $scope.bars = data;
    });
    $scope.message = 'Hello';
    $scope.test = {
      name: 'Flambeeria',
      description:'Very nice place to try different kind of fresh pizza! :) Pizza concept here has been changed. Instead of having tomato cream spread on the base, its a...'
    };
    $scope.data = [
      {
       name: 'Flambeeria',
       description:'Very nice place to try different kind of fresh pizza! :) Pizza concept here has been changed. Instead of having tomato cream spread on the base, its a...'
      }, {
        name: 'Miejsce Chwila',
        description: 'great pub, very spacious, good food to go with cheap beer, centrally located, close to bus/tram station. A stage where live performances happen, has a...'
      },{
        name:'Pies Czy Suka',
        description:'Wanna try something a bit different, then this is the place ! Went there on a date and let\'s just say the cocktails were the best I\'ve had in Warsaw. Yes,...'
      },{
        name:'Bar Warszawa',
        description:'Really good and really cheap. I am an American who was in Warsaw on business and my last night. I laid down 100 zloty ($25) at the bar and walked away full,...'
      }];
  });
