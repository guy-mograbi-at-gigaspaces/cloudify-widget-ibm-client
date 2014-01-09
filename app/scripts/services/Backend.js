'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .service('Backend', ['$resource', function Backend($resource) {

        this.listWidgets = function () {
            return $resource('/backend/widgetslist').query();
        };

    }]);
