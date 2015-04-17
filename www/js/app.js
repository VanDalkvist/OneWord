(function () {
    'use strict';

    angular.module('one-word').run(Run);

    Run.$inject = ['$rootScope', '$http', '$log', '$ionicPlatform', 'AuthService'];

    function Run($rootScope, $http, $log, $ionicPlatform, AuthService) {
        $ionicPlatform.ready(_onCordovaReady);

        _configureLogging();

        _configureHttp();

        function _onCordovaReady() {
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

        function _configureHttp() {
            AuthService.authorize().then(function (key) {
                $http.defaults.headers.common['User-Key'] = key;
            });
        }

        function _configureLogging() {
            $rootScope.$on("$stateChangeError", $log.log.bind($log));
        }
    }
})();