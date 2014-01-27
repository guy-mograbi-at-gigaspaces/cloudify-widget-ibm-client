'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .factory('Wizard', function () {

        var _widget = null;

        var _credentials = null;

        return {

            widget: function (w) {
                w && (_widget = w);
                return _widget;
            },

            credentials: function (c) {
                c && (_credentials = c);
                return _credentials;
            }
        };
    });
