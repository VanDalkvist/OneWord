(function () {

    'use strict';

    angular.module('one-word.core').service('PushNotifications', Service);

    Service.$inject = ['$window', '$log', '$ionicPlatform', 'Storage', 'PubSub', 'Config'];

    function Service($window, $log, $ionicPlatform, Storage, PubSub, Config) {

        var pushPlugin = undefined;

        // todo: create shared constant with keys
        var keysHash = {
            regId: "management:user:registrationId",
            isRegistered: "management:user:isRegistered"
        };

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

                var isRegistered = Storage.get(keysHash.isRegistered);

                !isRegistered && _sendRegistrationRequest();
            });
        }

        function _onNotificationRegistered(notification) {
            var regId = notification.regid;
            if (regId.length <= 0) return; // todo: ?

            $log.log("regId = " + regId);
            Storage.set(keysHash.regId, regId);
            Storage.set(keysHash.isRegistered, true);

            PubSub.publish('device:registered', regId);
        }

        function _onMessageReceived(notification) {
            // todo: load and navigate
        }

        function _onErrorOccurred(notification) {

        }

        function _sendRegistrationRequest() {
            pushPlugin.register(function _successHandler() {
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