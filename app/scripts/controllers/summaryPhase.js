'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .controller('SummaryPhaseCtrl', ['$scope', 'Wizard', function ($scope, Wizard) {

        $scope.model = {};

        $scope.model.widget = Wizard.widget();

        $scope.model.credentials = Wizard.credentials();

        $scope.ready = function () {
            return $scope.model.widget && $scope.model.credentials.valid;
        }

    }]);
