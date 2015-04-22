(function () {
    'use strict';

    angular.module('one-word.core.storage', ['LocalStorageModule']).config(Config);

    Config.$inject = ['localStorageServiceProvider'];

    function Config(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('one-word');
        localStorageServiceProvider.setStorageType('localStorage');
    }
})();