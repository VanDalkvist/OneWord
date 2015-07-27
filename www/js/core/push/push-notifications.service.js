(function () {

    'use strict';

    angular.module('one-word.core').service('PushNotifications', Service);

    Service.$inject = [
        '$window', '$log', '$ionicPlatform',
        'Storage', 'PubSub', 'Config', 'Keys'
    ];

    function Service($window, $log, $ionicPlatform,
                     Storage, PubSub, Config, Keys) {

        var pushPlugin = undefined;

        var handlers = {
            'registered': _onNotificationRegistered,
            'message': _onMessageReceived,
            'error': _onErrorOccurred
        };

        // public functions

        this.start = _start;
        this.onNotification = _onNotification;

        // private functions

        function _start() {
            $ionicPlatform.ready(function () {
                pushPlugin = $window.plugins.pushNotification;

                var isRegistered = Storage.get(Keys.Push.isRegistered);

                if (!isRegistered)
                    return _sendRegistrationRequest();

                PubSub.publish('device:registered', Storage.get(Keys.Push.regId));
            });
        }

        function _onNotificationRegistered(notification) {
            var regId = notification.regid;
            if (!regId || regId.length <= 0) {
                $log.log("Something went wrong...", notification);
                return;
            } // todo: ?

            $log.log("regId = " + regId);
            Storage.set(Keys.Push.regId, regId);
            Storage.set(Keys.Push.isRegistered, true);

            PubSub.publish('device:registered', regId);
        }

        function _onMessageReceived(notification) {
            // todo: load and navigate
        }

        function _onErrorOccurred(notification) {

        }

        function _sendRegistrationRequest() {
            if (Config.senderId === '{{senderId}}') {
                $log.log("Wrong sender id.");
                return;
            }

            return pushPlugin.register(function _successHandler(res, data) {
                $log.log("successful gcm registration");
            }, function _errorHandler(err) {
                $log.log("failure gcm registration");
            }, {
                "senderID": Config.senderId,
                "ecb": 'onNotification'
            });
        }

        function _onNotification(notification) {
            handlers[notification.event](notification);
        }
    }
})();