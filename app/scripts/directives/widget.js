'use strict';

angular.module('cloudifyWidgetIbmClientApp')
    .directive('widget', function (/*MixpanelService*/) {
        return {
            templateUrl: '/views/widget-template.html',
            restrict: 'A',
            scope: {
                selectedWidget: '=',
                upid: '=' // unique page id - for widget caching, we want each page to have a separate cookie, otherwise they will share sessions.
            },
            controller: function ($scope, $element, $location, $timeout, $sce, WidgetServer) {


                $scope.postUrl = WidgetServer.postUrl();
                $scope.pageUrl = $location.protocol() + '://' + $location.host();
                $scope.play = false;
                // TODO adapt for IBM credentials
                $scope.advanced = {
                    project_name: '',
                    hpcs_key: '',
                    hpcs_secret_key: ''
                };
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
                    var iframe = $element.find('#iframe');
                    var postObj = {
                        name: 'play_widget'
                    };

                    // translate advanced to whatever the postMessage to give the widget.
                    if (hasAdvancedCredentials()) {
                        // TODO adapt for IBM credentials
                        postObj.advanced = {
                            'project': $scope.advanced.project_name,
                            'key': $scope.advanced.hpcs_key,
                            'secretKey': $scope.advanced.hpcs_secret_key
                        };
                    } else {
                        console.log(['error, require advanced, but no advanced data, and still running play function.. wat?', $scope.advanced]);
                        return;
                    }
                    $scope.widgetLog = [];

                    console.log(['posting', postObj ]);
                    $.postMessage(JSON.stringify(postObj), $scope.postUrl, iframe.get(0).contentWindow);
                };

                $scope.stopWidget = function () {
                    $scope.play = false;
                    var iframe = $element.find('#iframe');
                    $.postMessage(JSON.stringify({name: 'stop_widget'}), $scope.postUrl, iframe.get(0).contentWindow);
                };

                function _isNotEmptyString(str) {
                    return str !== undefined && str !== null && $.trim(str).length > 0;
                }

                function hasAdvancedCredentials() {
                    // TODO adapt for IBM credentials
                    return _isNotEmptyString($scope.advanced.project_name) &&
                        _isNotEmptyString($scope.advanced.hpcs_key) &&
                        _isNotEmptyString($scope.advanced.hpcs_secret_key);
                }

                $scope.credentialsChecked = function () {
                    return  hasAdvancedCredentials();
                };

                $scope.playEnabled = function () {
                    if ($scope.selectedWidget === null) {
                        return false;
                    } else if ($scope.credentialsChecked()) {
                        return true;
                    }
                    return false;
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
                    var log = $element.find('#log')[0];
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
