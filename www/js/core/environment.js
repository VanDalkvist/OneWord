(function () {

    'use strict';

    angular.module('one-word.core').provider('Environment', Provider);

    Provider.$inject = [];

    function Provider() {
        // initialization

        var mainModuleName = 'one-word';
        var settings = {};

        // public functions

        this.setServerUrl = _setServerUrl;
        this.setStorage = _setStorage;

        this.$get = Service;

        // private functions

        function _setServerUrl(url) {
            settings.serverUrl = url;
        }

        function _setStorage(storage, module) {
            settings.storageType = storage;
            settings.moduleName = module || mainModuleName;
        }

        function Service() {
            return {
                serverUrl: function () {
                    return settings.serverUrl || '';
                },
                storage: function () {
                    return {
                        type: settings.storageType,
                        module: settings.moduleName
                    };
                }
            }
        }
    }
})();
