'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .controller('RecipesPhaseCtrl', ['$scope', 'Backend', 'GsConstants', 'Wizard', function ($scope, Backend, GsConstants, Wizard) {

        $scope.model = {};

        $scope.model.widgetsList = Backend.listWidgets(); // TODO get widgets list only once. possibly by creating a directive and defining a compile() function

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
            Wizard.widget(widget);
        };

        $scope.isChecked = function (widget) {
            if (!Wizard.widget()) {
                return false;
            }
            return Wizard.widget().id === widget.id;
        };

    }]);
