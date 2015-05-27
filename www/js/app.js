(function () {
    'use strict';

    angular.module('one-word').run(Run);

    Run.$inject = ['$rootScope', '$window', '$http', '$state', '$timeout', '$log', '$ionicPlatform', 'AuthService', 'State', 'PushNotifications', 'PubSub'];

    function Run($rootScope, $window, $http, $state, $timeout, $log, $ionicPlatform, AuthService, State, PushNotifications, PubSub) {
        $ionicPlatform.ready(_configurePlugins);

        _configureLogging();

        // todo: unsubscribe
        PubSub.subscribe('device:registered', _onDeviceRegistered);

        _configureHttp().then(function () {
            PushNotifications.start();
            return _navigateToWord();
        });

        $window.onNotification = PushNotifications.onNotification;

        function _onDeviceRegistered(registrationId) {
            return AuthService.sendRegistrationInfo(registrationId)
                .then(function (result) {
                    $log.log('RegistrationId was successfully saved.');
                }, function (err) {
                    $log.error('RegistrationId was not saved.');
                    // todo: show something like error dialog
                });
        }

        function _configurePlugins() {
            // Hide the accessory bar by default
            // remove this to show the accessory bar above the keyboard for form inputs
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if (window.StatusBar) {
                // org.apache.cordova.statusbar plugin required
                StatusBar.styleDefault();
            }
        }

        function _configureHttp(regId) {
            return AuthService.authorize(regId)
                .then(function (result) {
                    $http.defaults.headers.common['User-Key'] = result.key;
                }, function (err) {
                    // todo: show something like error dialog
                });
        }

        function _configureLogging() {
            $rootScope.$on("$stateChangeError", $log.log.bind($log));
        }

        function _navigateToWord() {
            $log.log('navigate to word...');
            return State.current().then(function (state) {
                $timeout(function () {
                    $state.go('word', {name: state.current.name});
                });
            });
        }
    }
})();