(function(){
  'use strict';

  /**
   * @memberof myApp.superPower
   * @ngdoc config
   */

  angular
    .module('myApp.superPower')
    .config(superPowerConfig);

  superPowerConfig.$inject = ['$routeProvider']

  function superPowerConfig($routeProvider) {
    $routeProvider.when('/super-power', {
      templateUrl: 'super-powerRoute/super-power.html',
      controller: 'superPowerController',
      controllerAs: 'superPower'
    });
  }
})();