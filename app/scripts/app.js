'use strict';

angular.module('cloudifyWidgetIbmClientApp', ['ngRoute', 'ngAnimate', 'ngResource'])
    .constant('GsConstants', {

        // TODO add names for breadcrumb
        routes: ['welcome-phase', 'recipes-phase', 'credentials-phase', 'summary-phase']

    })
    .config(['$routeProvider', 'GsConstants', function ($routeProvider, GsConstants) {

        $routeProvider
            .when('/', {
                templateUrl: '/views/' + GsConstants.routes[0] + '.html'
            })
            .when('/step/:index', {
                templateUrl: function (params) {
                    return '/views/' + GsConstants.routes[params.index] + '.html';
                }
            })
            // for reflecting the model, used in development
            .when('/r', {
                templateUrl: '/views/reflector.html'
            })
            .otherwise({
                redirectTo: '/'
            });

//        $locationProvider.html5Mode(true);
        // ~!~
    }])
    .run(['$route', angular.noop]);
