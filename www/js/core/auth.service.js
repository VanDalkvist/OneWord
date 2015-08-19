(function () {

    'use strict';

    angular.module('one-word.core').service('AuthService', Service);

    Service.$inject = ['$q', '$log', 'uuid', 'Storage', 'Auth'];

    function Service($q, $log, uuid, Storage, Auth) {

        // initialization
        var authRequest = null;

        var keysHash = {
            key: 'management:user:key'
        };

        // public functions

        this.authorize = _authorize;
        this.isRegistered = _isRegistered;
        this.authRequest = _authRequest;
        this.sendRegistrationInfo = _sendRegistrationInfo;

        // private functions

        function _authorize(regId) {
            if (_isRegistered()) {
                return $q.when({key: Storage.get(keysHash.key)});
            }

            var key = uuid.v4();

            authRequest = Auth.register(key, regId).then(function () {
                Storage.set(keysHash.key, key);
                $log.debug("User was registered with id: '" + key + "'");
                authRequest = null;
                return $q.when({key: key});
            }, function (err) {
                throw new Error("Cannot register.");
            });
            return authRequest;
        }

        function _authRequest() {
            return authRequest;
        }

        function _isRegistered() {
            var key = Storage.get(keysHash.key);
            return !!key;
        }

        function _sendRegistrationInfo(regId) {
            var userId = Storage.get(keysHash.key);

            return Auth.configure(userId, regId).then(function () {
                Storage.set(keysHash.key, userId);
                $log.debug("User '" + userId + "' set configuration successfully");
                return $q.when({key: userId});
            }, function (err) {
                throw new Error("Cannot register.");
            });
        }
    }
})();
