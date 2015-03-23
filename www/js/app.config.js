(function () {
    'use strict';

    var app = angular.module('one-word', ['ionic', 'ngResource', 'LocalStorageModule']);

    app.config(_config);

    _config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function _config($stateProvider, $urlRouterProvider) {

        // initialization

        $stateProvider
            .state('current', {
                url: "/current",
                templateUrl: "js/word/word.html",
                controller: 'WordCtrl as wordCtrl',
                resolve: {
                    WordService: ['WordProvider', function (WordProvider) {
                        return WordProvider.sync();
                    }]
                }
            });

        //.state('prev', {
        //    url: '/previous',
        //    templateUrl: "word/word.html",
        //    controller: 'WordCtrl as wordCtrl',
        //    resolve: {
        //        word: ['WordResource', 'WordProvider', function (WordResource, WordProvider) {
        //            return WordProvider.previous();
        //        }]
        //    }
        //})
        //
        //.state('next', {
        //    url: '/next',
        //    templateUrl: "word/word.html",
        //    controller: 'WordCtrl as wordCtrl',
        //    resolve: {
        //        word: ['WordResource', 'WordProvider', function (WordResource, WordProvider) {
        //            return WordProvider.next();
        //        }]
        //    }
        //});

        $urlRouterProvider.otherwise('/current');

        // private functions

    }
})();