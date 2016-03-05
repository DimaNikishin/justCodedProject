(function(){
  'use strict';

  /**
   * @memberof myApp.core
   * @ngdoc filter
   * @name listFilter
   */

  angular
    .module('myApp.core')
    .filter('listFilter',listFilter);

  listFilter.$inject = [];

  function listFilter(){
    var output = [];
    return function(inputArray,filteredProperty, callBackFunction){
      if(filteredProperty){
        output = inputArray.filter(function(value) {
          return value[filteredProperty];
        });
        callBackFunction();
        return output;
      }
      else{
        return inputArray
      }
    }
  }
})();