'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .factory('WidgetServer', function ($window) {

        var protocol = $window.conf.widgetServerProtocol;
        var host = $window.conf.widgetServer;
        var port = $window.conf.widgetServerPort;

        function _appendApiKey (req, apiKey) {
            if (req.indexOf('?') === -1) {
                req += '?';
            } else {
                req += '&';
            }
            return req + 'apiKey=' + apiKey;
        }

        return {

            postUrl: function () {
                var postUrl = protocol + '://' + host;
                port && (postUrl += ':' + port);
                return postUrl;
            },

            iconUrl: function (apiKey) {
                return _appendApiKey(this.postUrl() + '/widget/icon', apiKey);
            }

        };
    });
