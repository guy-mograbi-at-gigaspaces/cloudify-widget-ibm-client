'use strict';

describe('Controller: SummaryphaseCtrl', function () {

  // load the controller's module
  beforeEach(module('cloudifyWidgetIbmClientApp'));

  var SummaryphaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SummaryphaseCtrl = $controller('SummaryphaseCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
