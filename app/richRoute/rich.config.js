(function(){
  'use strict';

  /**
   * @memberof myApp.rich
   * @ngdoc config
   */

  angular
    .module('myApp.rich')
    .config(richConfig);

  richConfig.$inject = ['$routeProvider']

  function richConfig($routeProvider) {
    $routeProvider.when('/rich', {
      templateUrl: 'richRoute/rich.html',
      controller: 'richController',
      controllerAs: 'rich'
    });
  }
})();