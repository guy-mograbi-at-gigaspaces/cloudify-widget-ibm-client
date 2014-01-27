'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .directive('validationFocus', function () {
        return {
            restrict: 'EA',
            link: function postLink(scope, element, attrs) {

                scope.$watch('form', function (n, o) {
                    console.log('form: ', n, o)
                });

                scope.$watch('form.$pristine', function (n, o) {
                    console.log('pristine: ', n, o)
                });

                scope.$watch('form.$dirty', function (n, o) {
                    console.log('dirty: ', n, o)
                });

                scope.$watch('form.$valid', function (newValue, oldValue) {
                    console.log('valid: ', newValue, oldValue)
                    var firstInvalid = angular.element(element[0].querySelector('.ng-invalid'))[0];
                    firstInvalid && firstInvalid.focus();
                });
            }
        };
    });
