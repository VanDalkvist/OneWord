(function () {
    'use strict';

    angular.module('one-word').run(Run);

    Run.$inject = ['$rootScope', '$log', '$ionicPlatform'];

    function Run($rootScope, $log, $ionicPlatform) {
        $rootScope.$on("$stateChangeError", $log.log.bind($log));

        $ionicPlatform.ready(_onCordovaReady);
    }

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
})();