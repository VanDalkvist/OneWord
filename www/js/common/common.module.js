(function () {
    'use strict';

    angular.module('one-word.common', []).config(Config);

    Config.$inject = ['EnvironmentProvider'];

    function Config(EnvironmentProvider) {
        EnvironmentProvider.setStorage('LocalStorage');
    }
})();