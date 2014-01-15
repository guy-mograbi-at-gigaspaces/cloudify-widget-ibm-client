'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .controller('CredentialsPhaseCtrl', ['$scope', 'Wizard', function ($scope, Wizard) {

        $scope.model = {};

        $scope.model.credentials = Wizard.credentials();

        $scope.$watch('model.credentials', function (newValue, oldValue) {
            Wizard.credentials(newValue);
        });

    }]);
