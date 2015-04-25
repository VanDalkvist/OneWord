(function () {

    'use strict';

    angular.module('one-word.common').provider('Environment', Provider);

    Provider.$inject = [];

    function Provider() {
        // initialization

        var mainModuleName = 'one-word';
        var settings = {services: {}};

        // public functions

        this.setServerUrl = _setServerUrl;
        this.injectService = _injectService;

        this.$get = Service;
        this.$get.$inject = ['_'];

        // private functions

        function _setServerUrl(url) {
            settings.serverUrl = url;
        }

        function _injectService(serviceType, serviceToInject, moduleName) {
            settings.services[serviceType] = {
                type: serviceToInject,
                module: moduleName || mainModuleName
            };
        }

        function Service(_) {
            var service = {
                serverUrl: function () {
                    return settings.serverUrl || '';
                }
            };
            _.each(settings.services, function (value, key) {
                service[key] = function () {
                    return _.cloneDeep(value);
                }
            });
            return service;
        }
    }
})();
