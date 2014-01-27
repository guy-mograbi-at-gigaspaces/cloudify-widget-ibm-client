'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .controller('MainCtrl', ['$scope', 'Backend', function ($scope, Backend) {

        $scope.data = {};
        // TODO get widgets list only once. where?
        $scope.data.widgetsList = Backend.listWidgets();

        var recipeNameToClassnameMap = {
            'MySQL': 'mysql', 'JBoss': 'jboss', 'Memcached': 'memcached', 'Play Framework': 'play', 'Vertx': 'vertx', 'Drupal': 'drupal', 'MongoDB': 'mongodb', 'Petclinic-Simple': 'petclinic', 'Couchbase': 'couchbase', 'Cassandra': 'cassandra', 'ElasticSearch': 'elastic-search'
        };

        $scope.widgetImage = function (productName) {
            return recipeNameToClassnameMap[productName] || '';
        };

        $scope.selectWidget = function(widget){
            $scope.selectedWidget = widget;
        };

        $scope.selectedStyle = function(widget){
           return $scope.selectedWidget == widget ? "widget-selected" : "widget-unselected";
        }

    }]);
