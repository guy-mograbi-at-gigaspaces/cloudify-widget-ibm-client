'use strict';

angular.module('cloudifyWidgetIbmClientApp', ['ngRoute', 'ngAnimate', 'ngResource'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/views/welcome.html',
                controller: 'MainCtrl' // TODO ?
            })
            .when('/step/:index', {
                templateUrl: function (params) {
                    if (~~params.index === 0) {
                        return '/views/welcome.html';
                    }
                    return '/views/step-' + params.index + '.html';
                },
                controller: 'MainCtrl' // TODO ?
            })
            .otherwise({
                redirectTo: '/'
            });

        // ~!~
//        $locationProvider.html5Mode(true);
    }])
    .run(['$route', angular.noop]);
