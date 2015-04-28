(function () {

    'use strict';

    angular.module('one-word.core').service('LocalNotifications', Service);

    Service.$inject = ['$window', '$log', '$ionicPlatform', '_', 'moment', 'Storage', 'Counter'];

    function Service($window, $log, $ionicPlatform, _, moment, Storage, Counter) {

        // initialization

        // todo: move to constants
        var colon = ':';
        var keysHash = {
            scheduled: 'scheduled',
            word: function (wordName) {
                return this.scheduled + colon + wordName;
            }
        };

        $ionicPlatform.ready(function () {
            _init();
        });

        // public functions

        this.sked = _addSchedule;
        this.cancel = _removeFromSchedule;
        this.isAssigned = _scheduleExists;

        // private functions

        function _init() {
            // todo: get rid of the next line
            if (!$window.cordova) return;

            $window.cordova.plugins.notification.local.on('schedule', function (notification) {
                $log.debug("scheduled: " + notification.id + " notification for word: " + notification.title);

                Storage.push(keysHash.word(notification.title), notification.id);
            });
        }

        /**
         * 1. Add schedule for word (2, 3, 5, 8, 13)
         * 2. Save notifications ids to storage
         * @param word
         */
        function _addSchedule(word) {
            // todo: get rid of the next line
            if (!$window.cordova) return;

            var notifications = [
                // todo: remove testing notifications
                //_.extend({}, notificationTemplate, {at: moment().add(1, 'm').toDate(), id: Counter.increment()}),
                //_.extend({}, notificationTemplate, {at: moment().add(2, 'm').toDate(), id: Counter.increment()}),
                //_.extend({}, notificationTemplate, {at: moment().add(3, 'm').toDate(), id: Counter.increment()}),
                //_.extend({}, notificationTemplate, {at: moment().add(4, 'm').toDate(), id: Counter.increment()}),

                _buildNotification(word, 2),
                _buildNotification(word, 3),
                _buildNotification(word, 5),
                _buildNotification(word, 8),
                _buildNotification(word, 13)
            ];

            $ionicPlatform.ready(function () {
                $window.cordova.plugins.notification.local.schedule(notifications);
            });
        }

        function _buildNotification(word, day, id) {
            return {
                title: word.name,
                text: word.definition,
                id: id !== undefined ? id : Counter.increment(),
                at: moment().add(day, 'd').toDate()
            };
        }

        /**
         * Cancel father notifications for word:
         * 1. Get ids for word from Storage
         * 2. Cancel all notifications for word
         * @param word
         */
        function _removeFromSchedule(word) {
            // todo: get rid of the next line
            if (!$window.cordova) return;

            var ids = Storage.get(keysHash.word(word.name));
            $window.cordova.plugins.notification.local.cancel(ids, function () {
                $log.debug("canceled: " + ids.join(', '));
            });
        }

        /**
         * Check word for creation notifications
         * @param word
         */
        function _scheduleExists(word) {
            var ids = Storage.get(keysHash.word(word.name));

            return !!ids && ids.length > 0;
        }
    }
})();
