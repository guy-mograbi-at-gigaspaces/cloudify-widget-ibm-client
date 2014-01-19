'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .controller('CredentialsPhaseCtrl', ['$scope', 'Wizard', function ($scope, Wizard) {

        $scope.model = Wizard.credentials();

        $scope.$watch('form.$valid', function (newValue, oldValue) {
            if ($scope.model) {
                $scope.model.valid = newValue;
            }
            Wizard.credentials($scope.model);
        });

    }]);
