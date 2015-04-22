(function () {

    'use strict';

    var app = angular.module('one-word', [
        'ionic', 'ui.router',
        'one-word.settings', 'one-word.words', 'one-word.core'
    ]);

    app.config(Config);

    Config.$inject = ['$httpProvider', '$urlRouterProvider', '$ionicConfigProvider'];

    function Config($httpProvider, $urlRouterProvider, $ionicConfigProvider) {
        // todo: check it
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $urlRouterProvider.otherwise('/main');

        $ionicConfigProvider.views.maxCache(0);
    }
})();