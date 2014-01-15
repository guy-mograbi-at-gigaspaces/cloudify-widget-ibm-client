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
        function step(boundFn, dir) {
            if (boundFn()) {
                return false;
            }
            // TODO extract breadcrumb to directive
            if (dir >= 0) {
                $scope.model.going = 'next';
                $scope.model.step++;
                $scope.model.breadcrumb.push({
                    name: 'step ' + $scope.model.step,
                    path: $scope.model.step
                });
            } else {
                $scope.model.going = 'prev';
                $scope.model.step--;
                $scope.model.breadcrumb.pop();
            }
            return $location.path('step/' + $scope.model.step);
        };

        $scope.prev = function () {
            return step($scope.isStart, -1);
        };

        $scope.next = function () {
            return step($scope.isEnd, 1);
        };

    }]);
