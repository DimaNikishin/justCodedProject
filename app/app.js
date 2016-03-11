'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.core',
  'LocalStorageModule',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
