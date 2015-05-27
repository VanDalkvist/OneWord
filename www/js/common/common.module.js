(function () {
    'use strict';

    angular.module('one-word.common', []).config(Config);

    Config.$inject = ['EnvironmentProvider'];

    function Config(EnvironmentProvider) {
        EnvironmentProvider.injectService('storage', 'LocalStorage');
        EnvironmentProvider.injectService('notifications', 'LocalNotifications');
        //EnvironmentProvider.injectService('push', 'PushNotifications');
    }
})();