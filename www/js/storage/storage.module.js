(function () {
    'use strict';

    angular.module('one-word.storage', ['LocalStorageModule']).config(Config);

    Config.$inject = ['localStorageServiceProvider'];

    function Config(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('one-word');
        localStorageServiceProvider.setStorageType('localStorage');
    }
})();