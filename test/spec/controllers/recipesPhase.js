'use strict';

describe('Controller: RecipesphaseCtrl', function () {

  // load the controller's module
  beforeEach(module('cloudifyWidgetIbmClientApp'));

  var RecipesphaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecipesphaseCtrl = $controller('RecipesphaseCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
