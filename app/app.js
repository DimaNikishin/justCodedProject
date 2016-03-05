'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.core',
  'myApp.rich',
  'myApp.superPower',
  'myApp.genius',
  'LocalStorageModule',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
