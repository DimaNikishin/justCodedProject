
(function(){
  'use strict';

  /**
   * @memberof myApp.core
   * @ngdoc factory
   * @name sortService
   */

  angular
    .module('myApp.core')
    .factory('sortService',sortService);

  sortService.$inject = [];

  function sortService(){
    var service = {
      sortFunction: sortFunction,
      sortByRole: sortByRole,
      sortByName: sortByName
    }

    return service;

    /**
     * @function sortByName
     * @description sortByName is function which sort array of objects by property name
     * @param a first value to compare
     * @param b second value to compare
     */
    function sortByName(a,b){
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    }

    /**
     * @function sortByRole
     * @description sortByRole is function which sort array of objects by role
     * @param role - role to sort by
     * @param a first value to compare
     * @param b second value to compare
     */
    function sortByRole(role,a,b){
      for(var i =0; i< a.roles.length;i++){
        if(a.roles[i].key === role){
          if (Number(a.roles[i].value) > Number(b.roles[i].value)) {
            return -1;
          }
          if (Number(a.roles[i].value) < Number(b.roles[i].value)) {
            return 1;
          }
          return 0;
        }
      }
    }

    /**
     * @function sortFunction
     * @description sortFunction is function which sort array of objects and change sort flags
     * @param array - array to sort
     * @param sortType - object with sort flags
     * @param sortFunction - function to use in .sort()
     */
    function sortFunction(array,sortType,sortFunction){
      if(!sortType.sorted){
        sortType.sorted = true;
        array.sort(sortFunction);
      }
      else if(sortType.sorted && !sortType.reversed){
        sortType.reversed = true;
        array.reverse();
      }
      else{
        sortType.reversed = false;
        array.reverse();
      }
    }
  }
})();