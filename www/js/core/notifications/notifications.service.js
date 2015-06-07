(function () {

    'use strict';

    angular.module('one-word.core').service('LocalNotifications', Service);

    Service.$inject = ['$window', '$log', '$ionicPlatform', '_', 'moment', 'Storage', 'Counter'];

    function Service($window, $log, $ionicPlatform, _, moment, Storage, Counter) {

        // initialization

        var localNotificationsPlugin;
        var keysHash = {
            word: function (wordName) {
                return "scheduled: " + wordName;
            }
        };

        $ionicPlatform.ready(_init);

        // public functions

        this.sked = _addSchedule;
        this.cancel = _removeFromSchedule;
        this.isAssigned = _scheduleExists;

        // private functions

        function _init() {
            localNotificationsPlugin = $window.cordova.plugins.notification.local;
            localNotificationsPlugin.on('schedule', _setSchedule);
        }

        function _setSchedule(notification) {
            $log.debug("scheduled: " + notification.id + " notification for word: " + notification.title);

            Storage.push(keysHash.word(notification.title), notification.id);
        }

        /**
         * 1. Add schedule by days (2, 3, 5, 8, 13) for word
         * 2. Save notifications ids to storage
         * @param word
         * @param clickHandler
         */
        function _addSchedule(word, clickHandler) {

            //{title: word.name, text: word.definition, at: moment().add(1, 'm').toDate(), id: Counter.increment()},

            var days = [2, 3, 5, 8, 13];
            var notifications = days.map(function (day) {
                return _buildNotification(word, day);
            });

            $ionicPlatform.ready(function () {

                localNotificationsPlugin.schedule(notifications);

                localNotificationsPlugin.on('click', function (notification) {
                    clickHandler(notification.title);
                });
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
            var ids = Storage.get(keysHash.word(word.name));
            localNotificationsPlugin.cancel(ids, function () {
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
