(function () {

    'use strict';

    angular.module('one-word.core').service('AuthService', Service);

    Service.$inject = ['$q', 'uuid', 'Storage', 'Auth'];

    function Service($q, uuid, Storage, Auth) {

        // initialization

        var authorizeRequest = false;

        var keysHash = {
            key: 'management:user:key'
        };

        // public functions

        this.authorize = _authorize;
        this.sendRegistrationInfo = _sendRegistrationInfo;

        // private functions

        function _authorize(regId) {
            var key = Storage.get(keysHash.key);
            if (key) return $q.when({key: key});

            key = uuid.v4();
            return Auth.register(key, regId).then(function () {
                Storage.set(keysHash.key, key);
                return $q.when({key: key});
            }, function (err) {
                throw new Error("Cannot register.");
            });
        }

        function _sendRegistrationInfo(regId) {
            var userId = Storage.get(keysHash.key);

            return Auth.configure(userId, regId).then(function () {
                Storage.set(keysHash.key, userId);
                return $q.when({key: userId});
            }, function (err) {
                throw new Error("Cannot register.");
            });
        }
    }
})();
