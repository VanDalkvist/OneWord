(function () {

    'use strict';

    var app = angular.module('one-word', [
        'ionic', 'ngResource', 'ui.router', 'LocalStorageModule'
    ]);

    app.config(Config);

    Config.$inject = ['$httpProvider', '$urlRouterProvider'];

    function Config($httpProvider, $urlRouterProvider) {
        // todo: check it
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $urlRouterProvider.otherwise('/current');
    }
})();