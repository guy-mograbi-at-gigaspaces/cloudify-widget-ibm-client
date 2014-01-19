'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .directive('validationFocus', function () {
        return {
            restrict: 'EA',
            link: function postLink(scope, element, attrs) {

                scope.$watch('form.$valid', function (newValue, oldValue) {
                    var firstInvalid = angular.element(element[0].querySelector('.ng-invalid'))[0];
                    firstInvalid && firstInvalid.focus();
                });
            }
        };
    });
