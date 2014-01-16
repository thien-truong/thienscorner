'use strict';

/* jasmine specs for controllers go here */

describe('ThiensCorner controllers', function(){
  beforeEach(module('myApp'));
 
  describe('RecipeListCtrl', function(){
 
    it('should create "recipes" model with 2 recipes', inject(function($controller) {
      var scope = {},
          ctrl = $controller('RecipeListCtrl', { $scope: scope });
 
      expect(scope.recipes.length).toBe(2);
    }));
  });
});

