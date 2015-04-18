(function () {
    'use strict';

    angular.module('one-word.core', []).config(Config);

    Config.$inject = ['EnvironmentProvider'];

    function Config(EnvironmentProvider) {
        EnvironmentProvider.setStorage('LocalStorage');
    }
})();