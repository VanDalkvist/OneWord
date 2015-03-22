(function (app) {
    'use strict';

    app.$inject = ['$stateProvider', '$urlRouterProvider'];

    app.config(function ($stateProvider, $urlRouterProvider) {

        // initialization

        $stateProvider
            .state('current', {
                url: "/current",
                templateUrl: "word/word.html",
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

    });
})(angular.module('one-word'));