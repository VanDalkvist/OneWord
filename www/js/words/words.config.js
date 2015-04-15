(function () {
    'use strict';

    angular.module('one-word').config(Config);

    Config.$inject = ['$stateProvider'];

    function Config($stateProvider) {

        var stateBuilders = {
            current: function () {
                var provider = this;
                return provider.current();
            },
            back: function () {
                var provider = this;
                return provider.previous();
            },
            forward: function () {
                var provider = this;
                return provider.next();
            }
        };

        $stateProvider
            .state('main', {
                url: "/main",
                resolve: {
                    state: ['$state', '$stateParams', 'WordProvider', function ($state, $stateParams, WordProvider) {
                        return WordProvider.current().then(function (state) {
                            return $state.go('word', {name: state.current.name});
                        });
                    }]
                }
            })
            .state('word', {
                url: "/word/:name",
                params: {
                    direction: 'current'
                },
                templateUrl: "js/words/word.html",
                controller: 'WordCtrl',
                resolve: {
                    state: ['$stateParams', 'WordProvider', function ($stateParams, WordProvider) {
                        return stateBuilders[$stateParams.direction].call(WordProvider);
                    }]
                }
            });
    }
})();