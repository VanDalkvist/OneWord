(function () {

    'use strict';

    angular.module('one-word').provider('Settings', SettingsProvider);

    SettingsProvider.$inject = [];

    function SettingsProvider() {

        // initialization
        var serverUrl;

        // public functions

        this.init = _init;
        this.$get = Service;

        // private functions

        function _init(url) {
            serverUrl = url;
        }

        function Service() {
            return {
                serverUrl: function () {
                    return serverUrl || '';
                }
            }
        }
    }
})();
