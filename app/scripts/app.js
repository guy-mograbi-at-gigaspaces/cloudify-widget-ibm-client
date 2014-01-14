'use strict';

angular.module('cloudifyWidgetIbmClientApp', ['ngRoute', 'ngAnimate', 'ngResource'])
    .constant('GsConstants', {

        // TODO add names for breadcrumb
        routes: ['welcome-phase', 'recipes-phase', 'credentials-phase', 'summary-phase'],

        widgetNameToClassnameMap: {
            'MySQL': 'mysql',
            'JBoss': 'jboss',
            'Memcached': 'memcached',
            'Play Framework': 'play',
            'Vertx': 'vertx',
            'Drupal': 'drupal',
            'MongoDB': 'mongodb',
            'Petclinic-Simple': 'petclinic',
            'Couchbase': 'couchbase',
            'Cassandra': 'cassandra',
            'ElasticSearch': 'elastic-search',
            'BluStratus 20T': 'ibm-blu-cloud',
            'BLU CCI': 'ibm-blu-cloud',
            'BLU BMI': 'ibm-blu-cloud',
            'Mongo BMI': 'ibm-blu-cloud'
        }

    })
    .config(['$routeProvider', 'GsConstants', function ($routeProvider, GsConstants) {

        $routeProvider
            .when('/', {
                templateUrl: '/views/' + GsConstants.routes[0] + '.html',
                controller: 'MainCtrl' // TODO ?
            })
            .when('/step/:index', {
                templateUrl: function (params) {
                    return '/views/' + GsConstants.routes[params.index] + '.html';
                },
                controller: 'MainCtrl' // TODO ?
            })
            // for reflecting the model, used in development
            .when('/r', {
                templateUrl: '/views/reflector.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

//        $locationProvider.html5Mode(true);
    }])
    .run(['$route', angular.noop]);
