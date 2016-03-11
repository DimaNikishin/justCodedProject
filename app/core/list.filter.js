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
          for(var i=0; i< value.roles.length; i++){
            if(value.roles[i].key == filteredProperty){
              return value.roles[i].value;
            }
          }
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