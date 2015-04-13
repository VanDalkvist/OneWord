(function () {
    'use strict';

    angular.module('one-word').config(_config);

    _config.$inject = ['SettingsProvider'];

    function _config(SettingsProvider) {
        // todo: configure server url
        SettingsProvider.setServerUrl('http://localhost:3000');
        SettingsProvider.setStorage('LocalStorage');
    }
})();