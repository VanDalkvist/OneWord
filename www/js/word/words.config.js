(function () {
    'use strict';

    angular.module('one-word').config(Config);

    Config.$inject = ['$stateProvider'];

    function Config($stateProvider) {
        $stateProvider
            .state('current', {
                url: "/current",
                templateUrl: "js/word/word.html",
                controller: 'WordCtrl'
            });
    }
})();