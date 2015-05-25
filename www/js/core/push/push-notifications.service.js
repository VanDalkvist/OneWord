(function () {

    'use strict';

    angular.module('one-word.core').service('PushNotifications', Service);

    Service.$inject = ['$window', '$log', '$ionicPlatform', 'Storage'];

    function Service($window, $log, $ionicPlatform, Storage) {

        var pushPlugin = undefined;

        // todo: create shared constant with keys
        var keysHash = {
            regId: "management:user:registrationId"
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

                var regId = Storage.get(keysHash.regId);

                !regId && _sendRegistrationRequest();
            });
        }

        function _onNotificationRegistered(notification) {
            if (notification.regid.length <= 0) return;

            $log.log("regID = " + notification.regid);
            Storage.set(keysHash.regId, notification.regid);
        }

        function _onMessageReceived(notification) {
            // todo: load and navigate
        }

        function _onErrorOccurred(notification) {

        }

        function _sendRegistrationRequest() {
            // todo: set DROPBOX env
            // todo: add script with getting sender_id

            // todo: senderId - get from config
            pushPlugin.register(function _successHandler() {
                $log.log("successful gcm registration");
            }, function _errorHandler(err) {
                $log.log("failure gcm registration");
            }, {
                "senderID": 'senderId',
                "ecb": 'onNotification'
            });
        }

        function _onNotification(notification) {
            handlers[notification.event](notification);
        }
    }
})();