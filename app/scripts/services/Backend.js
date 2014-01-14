'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .service('Backend', ['$resource', function Backend($resource) {

        this.listWidgets = function () {
            // we rely on array as return value, this code should be more defensive
            return $resource('/backend/widgetslist').query();
//            var val = $resource('/backend/widgetslist').get();
//            console.log('val: ', val)
//            return val;
        };

    }]);
