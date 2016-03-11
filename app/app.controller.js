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

  mainController.$inject = ['$location','localStorageService','personRolesConstant','sortService'];

  function mainController($location,localStorageService,personRolesConstant,sortService){
    var that = this;
    that.recordsList = [];
    that.statistic = personRolesConstant;
    that.filterType = undefined;
    that.person = {
      roles: [],
      toDelete: false
    };

    that.addPerson = addPerson;
    that.toDelete = toDelete;
    that.deleteItem = deleteItem;
    that.updateTotals = updateTotals;
    that.sortByName = sortService.sortByName;
    that.sortByRole = sortService.sortByRole;
    that.madeSort = sortService.madeSort;
    that.navigation = navigation;

    Activate();

    /**
     * @function Activate
     * @description activation initial state of main controller: load records list from local storage and configure statistic properties
     */
    function Activate(){
      for(var i = 0; i < personRolesConstant.length;i++){
        var personRolesCopy = {};
        angular.copy(personRolesConstant[i],personRolesCopy);
        personRolesCopy.value = false;
        that.person.roles.push(personRolesCopy);
        that.statistic[i].value = 0;
      }
      that.recordsList = localStorageService.get('personList') || [];
      //localStorageService.remove('personList')
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

      for(var i=0; i< that.person.roles.length; i++){
        if($location.path() != '/home'&& that.person.roles[i].key === that.filterType && !that.person.roles[i].value){
          for(var m=0; m < that.person.roles.length; m++){
              that.person.roles[m].value = false;
          }
          that.filterType = undefined;
          $location.path('/home')
        }
      }
    }

    /**
     * @function updateTotals
     * @description updateTotals updates total amount of rich/with super power/genius persons using reduce function on array with persons and save to storage updated records list
     */
    function updateTotals(){
      for(var a=0; a<that.statistic.length; a++){
        that.statistic[a].value = 0;
      }
      for(var i=0; i<that.recordsList.length; i++){
        for(var z=0; z<that.recordsList[i].roles.length; z++){
          if(that.recordsList[i].roles[z].value){
            for(var q=0; q<that.statistic.length; q++){
              if(that.statistic[q].key === that.recordsList[i].roles[z].key){
                that.statistic[q].value++
              }
            }
          }
        }
      }
      localStorageService.set('personList', that.recordsList);
    }

    /**
     * @function navigation
     * @description navigate between routes and configures person object precondition and filters for them
     * @param path route url navigate to
     */
    function navigation(path){
      for(var i=0; i < that.person.roles.length; i++){
        if(that.person.roles[i].key === path){
          that.person.roles[i].value = true;
        }
        else{
          that.person.roles[i].value = false;
        }
      }
      if(path){
        $location.path('/home/'+ path);
        that.filterType = path;
      }
      else{
        $location.path('/home');
        that.filterType = undefined;
      }
    }

    /**
     * @function toDelete
     * @description mark what object from recordsList should be deleted
     * @param deleteItem object to delete from array
     */
    function toDelete(deleteItem){
      for(var i =0; i < that.recordsList.length; i++){
        that.recordsList[i].toDelete = false;
        deleteItem.toDelete = true;
      }
    }

    /**
     * @function toDelete
     * @description delete marked object
     */
    function deleteItem(){
      for(var i =0; i < that.recordsList.length; i++){
        //if(that.recordsList[i].$$hashKey == deleteItem.$$hashKey){
        //  var slicedArray = that.recordsList.slice(i);
        //  slicedArray.shift();
        //  that.recordsList.length = i;
        //  that.recordsList = that.recordsList.concat(slicedArray);
        //  localStorageService.set('personList', that.recordsList);
        //  updateTotals();
        //}
        if(that.recordsList[i].toDelete){
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