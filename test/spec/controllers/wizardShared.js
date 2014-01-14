'use strict';

describe('Controller: WizardSharedCtrl', function () {

  // load the controller's module
  beforeEach(module('cloudifyWidgetIbmClientApp'));

  var WizardSharedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WizardSharedCtrl = $controller('WizardSharedCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
