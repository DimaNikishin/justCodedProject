(function(){
  'use strict';

  /**
   * @memberof myApp.core
   * @ngdoc directive
   * @name Sidebar
   */

  angular
    .module('myApp.core')
    .directive('sidebar',sidebar);

  sidebar.$inject = [];

  function sidebar(){
    return {
      templateUrl: 'core/Sidebar/Sidebar.template.html',
      link: function(scope, element, attrs) {

      }
    }
  };
})();