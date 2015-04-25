(function () {

    'use strict';

    angular.module('one-word.core').service('LocalNotifications', Service);

    Service.$inject = ['Storage'];

    function Service(Storage) {

        // initialization

        // public functions

        this.addSchedule = _addSchedule;

        // private functions

        function _addSchedule() {
            try {
                cordova.plugins.notification.local.schedule({
                    id: 1,
                    text: 'Test notification',
                    every: 'minute'
                });
            } catch (e) {
                // todo: log
            }
        }
    }
})();
