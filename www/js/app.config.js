(function () {
    'use strict';

    var app = angular.module('one-word', ['ionic', 'ngResource', 'LocalStorageModule']);

    app.config(_config);
    //app.config(['$httpProvider', function($httpProvider) {
    //    $httpProvider.defaults.useXDomain = true;
    //    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //}
    //]);
    _config.$inject = ['$stateProvider', '$urlRouterProvider', 'SettingsProvider'];

    function _config($stateProvider, $urlRouterProvider, SettingsProvider) {

        $urlRouterProvider.otherwise('/current');

        // todo: configure server url
        //SettingsProvider.init('http://localhost:3000');

        // initialization

        $stateProvider
            .state('current', {
                url: "/current",
                templateUrl: "js/word/word.html",
                controller: 'WordCtrl',
                resolve: {
                    word: ['Storage', function (Storage) {
                        return Storage.get().$promise.then(function (word) {
                            return word;
                        }, function () {
                            return '';
                        });
                    }]
                }
            });
    }
})();