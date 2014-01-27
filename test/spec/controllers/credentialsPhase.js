'use strict';

describe('Controller: CredentialsphaseCtrl', function () {

  // load the controller's module
  beforeEach(module('cloudifyWidgetIbmClientApp'));

  var CredentialsphaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CredentialsphaseCtrl = $controller('CredentialsphaseCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
