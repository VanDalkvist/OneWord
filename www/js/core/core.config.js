(function () {
    'use strict';

    angular.module('one-word').config(_config);

    _config.$inject = ['EnvironmentProvider'];

    function _config(EnvironmentProvider) {
        // todo: configure server url
        EnvironmentProvider.setServerUrl('http://localhost:3000');
        EnvironmentProvider.setStorage('LocalStorage');
    }
})();