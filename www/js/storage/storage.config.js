(function () {
    'use strict';

    angular.module('one-word').config(_config);

    _config.$inject = ['localStorageServiceProvider'];

    function _config(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('one-word');
        localStorageServiceProvider.setStorageType('localStorage');
    }
})();