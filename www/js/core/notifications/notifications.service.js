(function () {

    'use strict';

    angular.module('one-word.core').service('LocalNotifications', Service);

    Service.$inject = ['$window', '_', 'moment', 'Storage'];

    function Service($window, _, moment, Storage) {

        // initialization

        var settings = {
            keys: {
                scheduled: 'scheduled:'
            }
        };

        // public functions

        this.sked = _addSchedule;
        this.cancel = _removeFromSchedule;
        this.isAssigned = _scheduleExists;

        // private functions

        /**
         * 1. Add schedule for word (2, 3, 5, 8, 13)
         * 2. Save notifications ids to storage
         * @param word
         */
        function _addSchedule(word) {
            if (!$window.cordova) return;

            // todo: link id to uniqueName
            var uniqueName = settings.keys.scheduled + word.name;

            var notificationTemplate = {
                id: 1,
                title: word.name,
                text: word.definition
            };

            var notifications = [
                _.extend({}, notificationTemplate, {at: moment().add(2, 'd').toDate()}),
                _.extend({}, notificationTemplate, {at: moment().add(3, 'd').toDate()}),
                _.extend({}, notificationTemplate, {at: moment().add(5, 'd').toDate()}),
                _.extend({}, notificationTemplate, {at: moment().add(8, 'd').toDate()}),
                _.extend({}, notificationTemplate, {at: moment().add(13, 'd').toDate()})
            ];
            $window.cordova.plugins.notification.local.schedule(notifications);
        }

        /**
         * Cancel father notifications for word:
         * 1. Get ids for word from Storage
         * 2. Cancel all notifications for word
         * @param word
         */
        function _removeFromSchedule(word) {
            if (!$window.cordova) return;

            // todo: check ids
            var ids = [1, 2];
            $window.cordova.plugins.notification.local.cancel(ids, function() {
            });
        }

        /**
         * Check word for creation notifications
         * @param word
         */
        function _scheduleExists(word) {

        }
    }
})();
