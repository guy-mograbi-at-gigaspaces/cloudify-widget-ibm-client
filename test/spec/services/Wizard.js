'use strict';

describe('Service: Wizard', function () {

  // load the service's module
  beforeEach(module('cloudifyWidgetIbmClientApp'));

  // instantiate service
  var Wizard;
  beforeEach(inject(function (_Wizard_) {
    Wizard = _Wizard_;
  }));

  it('should do something', function () {
    expect(!!Wizard).toBe(true);
  });

});
