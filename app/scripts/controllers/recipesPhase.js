'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .controller('RecipesPhaseCtrl', ['$scope', 'Backend', 'GsConstants', 'Wizard', 'WidgetServer', '$sce',
        function ($scope, Backend, GsConstants, Wizard, WidgetServer, $sce) {

        $scope.model = {};

        $scope.model.widgetsList = Backend.listWidgets(); // TODO get widgets list only once. possibly by creating a directive and defining a compile() function

        $scope.widgetIcon = function (apiKey) {
            if (!apiKey) {
                return false;
            }
            return $sce.trustAsResourceUrl(WidgetServer.iconUrl(apiKey));
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
