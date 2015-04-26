(function () {

    'use strict';

    angular.module('one-word.core').service('LocalNotifications', Service);

    Service.$inject = ['Storage'];

    function Service(Storage) {

        // initialization

        // public functions

        this.sked = _addToSchedule;
        this.cancel = _removeFromSchedule;
        this.isAssigned = _scheduleExists;

        // private functions

        /**
         * 1. Add schedule for word (2, 3, 5, 8, 13)
         * 2. Save notifications ids to storage
         * @param word
         */
        function _addToSchedule(word) {
            //plugins && plugins.notification.local.schedule({
            //    id: 1,
            //    text: 'Test notification',
            //    every: 'minute'
            //});
        }

        /**
         * Cancel father notifications for word:
         * 1. Get ids for word from Storage
         * 2. Cancel all notifications for word
         * @param word
         */
        function _removeFromSchedule(word) {

        }

        /**
         * Check word for creation notifications
         * @param word
         */
        function _scheduleExists(word) {

        }
    }
})();
