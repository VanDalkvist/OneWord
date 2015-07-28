(function () {
    'use strict';

    angular.module('one-word.words', ['ui.router', 'one-word.core']).config(Config);

    Config.$inject = ['$stateProvider'];

    function Config($stateProvider) {

        var stateBuilders = {
            current: function () {
                var provider = this;
                return provider.current.apply(provider, Array.prototype.slice.call(arguments, 0));
            },
            back: function () {
                var provider = this;
                return provider.previous.apply(provider, Array.prototype.slice.call(arguments, 0));
            },
            forward: function () {
                var provider = this;
                return provider.next.apply(provider, Array.prototype.slice.call(arguments, 0));
            },
            exact: function () {
                var provider = this;
                return provider.exact.apply(provider, Array.prototype.slice.call(arguments, 0));
            }
        };

        $stateProvider
            .state('main', {
                url: "^",
                abstract: true
            })
            .state('word', {
                url: "/word/:name",
                params: {
                    direction: 'current'
                },
                templateUrl: "js/words/word.html",
                controller: 'WordCtrl as word',
                resolve: {
                    state: ['$stateParams', 'State', 'AuthService', function ($stateParams, State, AuthService) {
                        var authRequest = AuthService.authRequest();
                        if (!authRequest)
                            return stateBuilders[$stateParams.direction].apply(State, [$stateParams.name]);

                        return authRequest.then(function () {
                            return stateBuilders[$stateParams.direction].apply(State, [$stateParams.name]);
                        });
                    }]
                }
            });
    }
})();