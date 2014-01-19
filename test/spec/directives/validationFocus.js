'use strict';

describe('Directive: validationFocus', function () {

  // load the directive's module
  beforeEach(module('cloudifyWidgetIbmClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<validation-focus></validation-focus>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the validationFocus directive');
  }));
});
