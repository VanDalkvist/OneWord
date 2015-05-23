(function () {
    'use strict';

    angular.module('one-word').run(Run);

    Run.$inject = ['$rootScope', '$http', '$state', '$timeout', '$log', '$ionicPlatform', 'AuthService', 'State'];

    function Run($rootScope, $http, $state, $timeout, $log, $ionicPlatform, AuthService, State) {
        $ionicPlatform.ready(_configurePlugins);

        _configureLogging();

        _configureHttp().then(_navigateToWord);

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

        function _configureHttp() {
            return AuthService.authorize()
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
            State.current().then(function (state) {
                $timeout(function () {
                    $state.go('word', {name: state.current.name});
                });
            });
        }
    }
})();