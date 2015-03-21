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
                    word: ['WordResource', 'WordProvider', function (WordResource, WordProvider) {
                        return WordResource.get({word: WordProvider.current()}).$promise;
                    }]
                }
            })

            .state('prev', {
                url: '/previous',
                templateUrl: "word/word.html",
                controller: 'WordCtrl as wordCtrl',
                resolve: {
                    word: ['WordResource', 'WordProvider', function (WordResource, WordProvider) {
                        return WordResource.get({word: WordProvider.previous()}).$promise;
                    }]
                }
            })

            .state('next', {
                url: '/next',
                templateUrl: "word/word.html",
                controller: 'WordCtrl as wordCtrl',
                resolve: {
                    word: ['WordResource', 'WordProvider', function (WordResource, WordProvider) {
                        return WordResource.get({word: WordProvider.next()}).$promise;
                    }]
                }
            });

        $urlRouterProvider.otherwise('/current');

        // private functions

    });
})(angular.module('one-word'));