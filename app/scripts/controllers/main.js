'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.data = {};
        $scope.data.widgetsList = (function () {

            // TODO use $resource instead of $http
            return $http.get('/backend/widgetslist');
//            return $http.get('http://localhost:9001/backend/widgetslist');

            // TODO use interceptor instead of then
/*
                .then(function (result) {
                    return result.data;
                });
*/
        })();

    });
