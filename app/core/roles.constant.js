(function(){
  'use strict';

  /**
   * @memberof myApp.core
   * @ngdoc constant
   * @name personRolesConstant
   */

  angular
    .module('myApp.core')
    .constant('personRolesConstant', [{key: "rich", title: "Rich"}, {key: "genius", title: "Genius"}, {key: "superpower", title: "Super power"},{key: "majestic", title: "majestic"}]);
})();