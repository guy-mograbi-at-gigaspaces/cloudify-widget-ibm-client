'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .controller('NavigationCtrl', ['$scope', '$location', 'GsConstants', function ($scope, $location, GsConstants) {

        $scope.model = {
            step: 0,
            min: 0,
            max: GsConstants.routes.length - 1,
            going: 'next',
            breadcrumb: []
        };

        $scope.isStart = function () {
            return $scope.model.step <= $scope.model.min;
        };

        $scope.isEnd = function () {
            return $scope.model.step >= $scope.model.max;
        };

            /**
             * increments or decrements the step
             * @param boundFn check if we hit the steps bounds
             * @param dir positive number (including 0) to go forward, negative for backward
             * @returns {*}
             */
            function step (boundFn, dir) {
                if (boundFn()) {
                    return false;
                }
                // TODO extract breadcrumb to directive
                if (dir >= 0) {
                    $scope.data.going = 'next';
                    $scope.data.step++;
                    $scope.data.breadcrumb.push({
                        name: 'step ' + $scope.data.step,
                        path: $scope.data.step
                    });
                } else {
                    $scope.data.going = 'prev';
                    $scope.data.step--;
                    $scope.data.breadcrumb.pop();
                }
                return $location.path('/step/' + $scope.data.step);
            };

        $scope.prev = function () {
            return step($scope.isStart, -1);
        };

        $scope.next = function () {
            return step($scope.isEnd, 1);
        };

    }]);
