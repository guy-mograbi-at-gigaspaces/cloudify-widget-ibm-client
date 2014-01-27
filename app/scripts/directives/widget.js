'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .directive('widget', function (/*MixpanelService*/) {
        return {
            templateUrl: '/views/widget-template.html',
            restrict: 'A',
            scope: {
                selectedWidget: '=',
                credentials: '='
            },
            controller: function ($scope, $element, $location, $timeout, $sce, WidgetServer) {


                $scope.postUrl = WidgetServer.postUrl();
                $scope.pageUrl = $location.protocol() + '://' + $location.host() + ($location.port() && ':' + $location.port() || '');
                $scope.play = false;
                $scope.manageUrl = null;
                $scope.consoleUrl = null;
                $scope.widgetLog = [];


                function getResourceUrl() {
                    if (!$scope.selectedWidget) {
                        return '';
                    }
                    var apiKey = $scope.selectedWidget.apiKey;
                    var url = $scope.postUrl + '/widget/widget?apiKey=' +
                        apiKey +
                        '&origin_page_url=' + $scope.pageUrl + '/' +
                        apiKey +
                        '_' +
                        ($scope.upid || Date.now()) +
                        '&title=' + $scope.selectedWidget.productName;
                    return url;
                }

                $scope.widgetIframeSrc = $sce.trustAsResourceUrl(getResourceUrl());


                var isNewWidgetSelected = false;
                var firstPlayTick = true;
                var handlers = {
                    'widget_log': function (e) {
                        if (isNewWidgetSelected) {
                            return;
                        }

                        $scope.$apply(function () {
                            var msg = JSON.parse(e.data);

                            if (msg.message.charAt(0) === '.') {
                                $scope.widgetLog.pop();
                                $scope.widgetLog.push(msg.message);
                            } else {
                                $scope.widgetLog.splice($scope.widgetLog.length - 1, 0, msg.message);
                            }

                            if (msg.type === 'important') {
                                $scope.widgetLog.pop();
                                $timeout(_scrollLog, 200);
                            }

                            if (msg.type === 'error') {
//                                widgetService.reportError(errorData);
                            }
                            _scrollLog();
                        });
                    },
                    'widget_status': function (e) {
                        var msg = JSON.parse(e.data);

                        if (msg.status.publicIp !== null) {
                            $scope.manageUrl = 'http://' + msg.status.publicIp + ':8099/';
                        } else {
                            $scope.manageUrl = null;
                        }

                        if (msg.status.instanceIsAvailable === true) {
                            $scope.consoleUrl = msg.status.consoleLink.url;
                        } else {
                            $scope.consoleUrl = null;
                        }

                        if (isNewWidgetSelected) {
                            $scope.$apply(function () {
                                $scope.widgetLog = msg.status.output;
                                isNewWidgetSelected = false;
                            });
                        }

                        if (firstPlayTick) {
                            firstPlayTick = false;
                        }
                        $scope.play = msg.status.state !== 'STOPPED';

                    },
                    'stop_widget': function () {
                        firstPlayTick = true;
                    }
                };

                $scope.playWidget = function () {

                    if (!$scope.credentialsChecked()) {
                        return;
                    }

                    $scope.play = true;
                    var iframe = _getIframe();
                    var postObj = {
                        name: 'play_widget'
                    };

                    // translate advanced to whatever the postMessage to give the widget.
                    if (hasCredentials()) {
                        postObj.advanced = {
                            'userId': $scope.credentials.userId,
                            'password': $scope.credentials.password,
                            'apiKey': $scope.credentials.apiKey
                        };
                    } else {
                        console.log(['error, require advanced, but no advanced data, and still running play function.. wat?', $scope.credentials]);
                        return;
                    }
                    $scope.widgetLog = [];

                    console.log(['posting', postObj ]);
                    $.postMessage(JSON.stringify(postObj), $scope.postUrl, iframe.contentWindow);
                };

                function _getElement(anySelector) {
                    return angular.element($element[0].querySelector(anySelector))[0];
                }

                function _getIframe() {
                    return _getElement('#iframe');
                }

                function _getLog() {
                    return _getElement('#log');
                }

                $scope.stopWidget = function () {
                    $scope.play = false;
                    var iframe = _getIframe();
                    $.postMessage(JSON.stringify({name: 'stop_widget'}), $scope.postUrl, iframe.contentWindow);
                };

                function _isNotEmptyString(str) {
                    return str !== undefined && str !== null && $.trim(str).length > 0;
                }

                function hasCredentials() {
                    return _isNotEmptyString($scope.credentials.userId) &&
                        _isNotEmptyString($scope.credentials.password) &&
                        _isNotEmptyString($scope.credentials.apiKey);
                }

                $scope.credentialsChecked = function () {
                    return  hasCredentials();
                };

                $scope.playEnabled = function () {
                    if ($scope.selectedWidget === null) {
                        return false;
                    } else if ($scope.credentialsChecked()) {
                        return true;
                    }
                    return false;
                };

                $scope.playButtonAction = function () {
                    if (!$scope.playButtonState) {
                        return;
                    }
                    if ($scope.playButtonState === 'play') {
                        $scope.playWidget();
                    } else if ($scope.playButtonState === 'stop') {
                        $scope.stopWidget();
                    }
                };

                $scope.$watch('selectedWidget', function (newWidget) {
                    if (newWidget !== null) {
                        $scope.play = false;
                        $scope.manageUrl = null;
                        $scope.consoleUrl = null;
                        $scope.widgetLog = [];
                        isNewWidgetSelected = true;
                    }
                });

                $scope.isPlaying = function () {
                    return $scope.play;
                };

                $scope.getVideoURL = function (videoURL) {
                    videoURL && (videoURL = videoURL.replace('http:', 'https:'));
                    return videoURL;
                };

                function _scrollLog() {
                    var log = _getLog();
                    log.scrollTop = log.scrollHeight;
                }

                $.receiveMessage(function (e) {
                    console.log('received: ', e)
                    var msg = JSON.parse(e.data);

                    if (handlers.hasOwnProperty(msg.name)) {
                        try {
                            handlers[msg.name](e);
                        } catch (exception) {
                            console.log(['problem invoking callback for ', e, exception]);
                        }
                    }
                });

            }
        };
    });
