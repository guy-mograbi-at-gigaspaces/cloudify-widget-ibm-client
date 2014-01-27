'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .controller('CredentialsPhaseCtrl', ['$scope', 'Wizard', function ($scope, Wizard) {

        $scope.model = {};

        $scope.model.credentials = Wizard.credentials();

        $scope.model.formData = [
            {
                label: 'User ID',
                ibmKey: 'userId',
                inputType: 'text'
            },
            {
                label: 'Password',
                ibmKey: 'password',
                inputType: 'password'
            },
            {
                label: 'API Key',
                ibmKey: 'apiKey',
                inputType: 'text'
            }
        ];

        $scope.$watch('form.$valid', function (newValue, oldValue) {
            if ($scope.model.credentials) {
                $scope.model.credentials.valid = newValue;
            }
            Wizard.credentials($scope.model.credentials);
        });

    }]);
