(function () {

    'use strict';

    angular.module('one-word.management').service('AuthService', Service);

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
            if (key) return $q.when({status: 'NOTREQ', message: 'Not required.', result: {key: key}});

            key = uuid.v4();
            Storage.set(keysHash.key, key);
            
            return Auth.register().then(function (key) {
                return $q.when({status: 'SUCCESS', message: 'Authorization successful.', result: {key: key}});
            }, function (err) {
                return $q.when({status: 'ERR', message: 'Error occurs.'});
            });
        }
    }
})();
