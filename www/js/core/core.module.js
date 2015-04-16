(function () {
    'use strict';

    angular.module('one-word.core', []).config(Config);

    Config.$inject = ['EnvironmentProvider'];

    function Config(EnvironmentProvider) {
        // todo: configure server url by gulp task
        EnvironmentProvider.setServerUrl('http://localhost:3000');
        EnvironmentProvider.setStorage('LocalStorage');
    }
})();