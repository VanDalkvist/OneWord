(function () {

    'use strict';

    angular.module('one-word.management').service('AuthService', Service);

    Service.$inject = ['Storage', 'uuid'];

    function Service(Storage, uuid) {

        // initialization

        var keysHash = {
            key: 'management:user:key'
        };

        // public functions

        this.authorize = _authorize;

        // private functions

        function _authorize() {
            var key = Storage.get(keysHash.key);
            if (key) return key;

            key = uuid.v4();
            Storage.set(keysHash.key, key);
            return key;
        }
    }
})();
