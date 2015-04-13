(function () {

    'use strict';

    var app = angular.module('one-word', [
        'ionic', 'ngResource', 'LocalStorageModule'
    ]);

    app.config(_config);

    _config.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider'];

    function _config($httpProvider, $stateProvider, $urlRouterProvider) {

        // todo: check it
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $urlRouterProvider.otherwise('/current');

        // initialization

        // todo: move to concrete subfolder
        $stateProvider
            .state('current', {
                url: "/current",
                templateUrl: "js/word/word.html",
                controller: 'WordCtrl' //,
                // todo: resolve current word from Local Storage
                //resolve: {
                //    word: ['Storage', function (Storage) {
                //        return Storage.get().$promise.then(function (word) {
                //            return word;
                //        }, function () {
                //            return '';
                //        });
                //    }]
                //}
            });
    }
})();