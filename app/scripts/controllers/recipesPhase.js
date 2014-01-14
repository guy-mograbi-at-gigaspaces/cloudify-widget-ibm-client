'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .controller('RecipesPhaseCtrl', ['$scope', 'Backend', 'GsConstants', function ($scope, Backend, GsConstants) {

        $scope.model = {};

        $scope.model.widgetsList = Backend.listWidgets(); // TODO get widgets list only once. possibly by creating a directive and defining a compile() function

        $scope.model.selectedWidget = '';

        $scope.widgetClassname = function (productName) {
            return GsConstants.widgetNameToClassnameMap[productName] || '';
        };

        $scope.widgetIcon = function (apiKey) {
            if (!apiKey) {
                return false;
            }
            return window.conf.widgetServerProtocol + '://' + window.conf.widgetServer + '/widget/icon?apiKey=' + apiKey;
        };

        $scope.selectWidget = function (widget) {
            $scope.model.selectedWidget = widget;
        };

    }]);
