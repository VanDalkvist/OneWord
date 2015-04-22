(function () {

    'use strict';

    angular.module('one-word.core').service('AuthService', Service);

    Service.$inject = ['$q', 'uuid', 'Storage', 'Auth'];

    function Service($q, uuid, Storage, Auth) {

        // initialization

        var keysHash = {
            key: 'management:user:key'
        };

        // public functions

        this.authorize = _authorize;

        // private functions

        function _authorize() {
            var key = Storage.get(keysHash.key);
            if (key) return $q.when({key: key});

            key = uuid.v4();
            return Auth.register(key).then(function () {
                Storage.set(keysHash.key, key);
                return $q.when({key: key});
            }, function (err) {
                throw new Error("Cannot register.");
            });
        }
    }
})();
