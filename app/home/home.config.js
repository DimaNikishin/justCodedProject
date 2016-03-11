(function(){
  'use strict';

  /**
   * @memberof myApp.home
   * @ngdoc config
   */

  angular
    .module('myApp.home')
    .config(homeConfig);

  homeConfig.$inject = ['$routeProvider']

  function homeConfig($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'homeController',
      controllerAs: 'home'
    }).when('/home/:roleKey', {
      templateUrl: 'home/home.html',
      controller: 'mainController'
    });;
  }
})();