'use strict';

/* Controllers */

var thienscornerApp = angular.module('myApp', []);

thienscornerApp.controller('RecipeListCtrl', function($scope) {
  $scope.recipes = [
    {'name': 'Zuppa Tuscana',
     'servings': '4 servings',
     'preparation_minutes': '15 minutes',
     'cooking_minutes': '60 minutes'},
    {'name': 'Cookie',
     'servings': '4 servings',
     'preparation_minutes': '10 minutes',
     'cooking_minutes': '20 minutes'}
  ];
});
  
