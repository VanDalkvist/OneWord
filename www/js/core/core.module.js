(function () {
    'use strict';

    angular
        .module('one-word.core', ['one-word.common', 'one-word.core.storage', 'one-word.api'])
        .config(Config);

    Config.$inject = ['NotificationsProvider'];

    function Config(NotificationsProvider) {
        NotificationsProvider.setNotificationsType('local');
    }
})();