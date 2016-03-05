(function(){
  'use strict';

  /**
   * @memberof myApp.core
   * @ngdoc directive
   * @name Recordbar
   */

  angular
    .module('myApp.core')
    .directive('recordbar',recordbar);

  recordbar.$inject = [];

  function recordbar(){
    return {
      templateUrl: 'core/Recordbar/Recordbar.template.html',
      link: function(scope, element, attrs) {
      }
    }
  };
})();