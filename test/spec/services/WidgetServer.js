'use strict';

describe('Service: WidgetServer', function () {

  // load the service's module
  beforeEach(module('cloudifyWidgetIbmClientApp'));

  // instantiate service
  var WidgetServer;
  beforeEach(inject(function (_WidgetServer_) {
    WidgetServer = _WidgetServer_;
  }));

  it('should do something', function () {
    expect(!!WidgetServer).toBe(true);
  });

});
