'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .controller('NavigationCtrl', ['$scope', '$location', function ($scope, $location) {

            $scope.data = {
                step: 0,
                min: 0,
                max: 2,
                going: 'next'
            };

            $scope.isStart = function () {
                return $scope.data.step <= $scope.data.min;
            };

            $scope.isEnd = function () {
                return $scope.data.step >= $scope.data.max;
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
                if (dir >= 0) {
                    $scope.data.going = 'next';
                    $scope.data.step++;
                } else {
                    $scope.data.going = 'prev';
                    $scope.data.step--;
                }
                return $location.path('step/' + $scope.data.step);
            };

            $scope.prev = function () {
                return step($scope.isStart, -1);
            };

            $scope.next = function () {
                return step($scope.isEnd, 1);
            };

        }]);
