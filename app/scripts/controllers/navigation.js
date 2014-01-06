'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .controller('NavigationCtrl', [
        '$scope', '$location',
        function ($scope, $location) {

            $scope.data = {
                step: 0,
                min: 0,
                max: 1
            };

            $scope.isStart = function () {
                return $scope.data.step <= $scope.data.min;
            };

            $scope.isEnd = function () {
                return $scope.data.step >= $scope.data.max;
            };

            $scope.prev = function () {
                if ($scope.isStart()) {
                    return false;
                }
                return $location.path('step/' + --$scope.data.step);
            };

            $scope.next = function () {
                if ($scope.isEnd()) {
                    return false;
                }
                $location.path('step/' + ++$scope.data.step);
            };

        }]);
