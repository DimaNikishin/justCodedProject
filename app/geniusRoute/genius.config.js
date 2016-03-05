(function(){
  'use strict';

  /**
   * @memberof myApp.genius
   * @ngdoc config
   */

  angular
    .module('myApp.genius')
    .config(geniusrConfig);

  geniusrConfig.$inject = ['$routeProvider']

  function geniusrConfig($routeProvider) {
    $routeProvider.when('/genius', {
      templateUrl: 'geniusRoute/genius.html',
      controller: 'geniusController',
      controllerAs: 'genius'
    });
  }
})();