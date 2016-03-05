(function(){
  'use strict';

  /**
   * @memberof myApp
   * @ngdoc controller
   * @name mainController
   */

  angular
    .module('myApp')
    .controller('mainController',mainController);

  mainController.$inject = ['$location','localStorageService'];

  function mainController($location,localStorageService){
    var that = this;
    that.recordsList = [];
    that.recordsList.totalRich = 0;
    that.recordsList.totalSuperPower = 0;
    that.recordsList.totalGenius = 0;
    that.filterType = undefined;
    that.person = {
      isSuperPower: false,
      isRich: false,
      isGenius: false,
      toDelete: false
    };

    that.addPerson = addPerson;
    that.toDelete = toDelete;
    that.deleteItem = deleteItem;
    that.updateTotals = updateTotals;
    that.sortByName = sortByName;
    that.sortBySuperPower = sortBySuperPower;
    that.sortByRich = sortByRich;
    that.sortByGenius = sortByGenius;
    that.navigation = navigation;

    Activate();

    function Activate(){
      that.recordsList = localStorageService.get('personList') || [];
      updateTotals()
    }

    /**
     * @function addPerson
     * @description addPerson is function which adds persons to array (using copy to create object with separate link)
     * @param person object to push onto array with persons
     */
    function addPerson(person){
      var personCopy = {};
      angular.copy(person,personCopy);
      that.recordsList.push(personCopy);
      localStorageService.set('personList', that.recordsList);
      updateTotals();
      if($location.path() != '/Home'&& !that.person[that.filterType]){
        that.filterType = undefined;
        $location.path('/Home')
      }
    }

    /**
     * @function updateTotals
     * @description updateTotals updates total amount of rich/with super power/genius persons using reduce function on array with persons and save to storage updated records list
     */
    function updateTotals(){
      that.recordsList.totalRich = that.recordsList.reduce(function(previousValue, currentValue, index, array) {return previousValue + Number(currentValue.isRich);},0);
      that.recordsList.totalSuperPower = that.recordsList.reduce(function(previousValue, currentValue, index, array) {return previousValue + Number(currentValue.isSuperPower);},0);
      that.recordsList.totalGenius = that.recordsList.reduce(function(previousValue, currentValue, index, array) {return previousValue + Number(currentValue.isGenius);},0);
      localStorageService.set('personList', that.recordsList);
    }

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
     * @function sortBySuperPower
     * @description sortByName is function which sort array of objects by property isSuperPower
     * @param a first value to compare
     * @param b second value to compare
     */
    function sortBySuperPower(a,b){
      if (Number(a.isSuperPower) > Number(b.isSuperPower)) {
        return -1;
      }
      if (Number(a.isSuperPower) < Number(b.isSuperPower)) {
        return 1;
      }
      return 0;
    }

    /**
     * @function sortBySuperPower
     * @description sortByName is function which sort array of objects by property isRich
     * @param a first value to compare
     * @param b second value to compare
     */
    function sortByRich(a,b){
      if (Number(a.isRich) > Number(b.isRich)) {
        return -1;
      }
      if (Number(a.isRich) < Number(b.isRich)) {
        return 1;
      }
      return 0;
    }

    /**
     * @function sortBySuperPower
     * @description sortByName is function which sort array of objects by property isGenius
     * @param a first value to compare
     * @param b second value to compare
     */
    function sortByGenius(a,b){
      if (Number(a.isGenius) > Number(b.isGenius)) {
        return -1;
      }
      if (Number(a.isGenius) < Number(b.isGenius)) {
        return 1;
      }
      return 0;
    }

    function navigation(path, isRich, isSuperPower, isGenius){
      that.person.isRich = isRich;
      that.person.isSuperPower = isSuperPower;
      that.person.isGenius = isGenius;

      if(that.person.isRich){
        that.filterType = "isRich"
      }
      else if(that.person.isSuperPower){
        that.filterType = "isSuperPower"
      }
      else if(that.person.isGenius){
        that.filterType = "isGenius"
      }
      else{
        that.filterType = undefined;
      }
      $location.path(path)
    }

    function toDelete(deleteItem){
      for(var i =0; i < that.recordsList.length; i++){
        that.recordsList[i].toDelete = false;
        deleteItem.toDelete = true;
      }
    }

    function deleteItem(deleteItem){
      for(var i =0; i < that.recordsList.length; i++){
        if(that.recordsList[i].$$hashKey == deleteItem.$$hashKey){
          var slicedArray = that.recordsList.slice(i);
          slicedArray.shift();
          that.recordsList.length = i;
          that.recordsList = that.recordsList.concat(slicedArray);
          localStorageService.set('personList', that.recordsList);
          updateTotals();
        }
      }
    }
  }
})();