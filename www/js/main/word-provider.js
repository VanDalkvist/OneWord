(function () {

    'use strict';

    angular.module('one-word').factory('WordProvider', Factory);

    Factory.$inject = ['$q', 'Storage'];

    function Factory($q, Storage) {
        var keysHash = {
            current: 'words:current',
            prev: 'words:prev',
            next: 'words:next',
            history: 'words:history'
        };

        return {
            sync: _sync
        };

        function _sync() {
            return Storage.query(function (data) {
                words = data;

                return {
                    current: _current,
                    next: _next,
                    previous: _previous
                };
            });
        }

        /**
         * todo:
         * 1. get from cache if exist
         * 2. if no - get by Word resource
         * 3. put into cache
         * @returns {*}
         * @private
         */
        function _current() {
            return $q.when(Storage.get(keysHash.current));
        }

        function _next() {
            var current = Storage.get(keysHash.current);
            var prev = Storage.get(keysHash.prev);

            Storage.push(keysHash.history, prev);
            Storage.set(keysHash.prev, current);

            var toBeCurrent = Storage.get(keysHash.next);
            Storage.set(keysHash.current, toBeCurrent);

            // todo: generate next
            // Storage.set(keysHash.next, next);

            return $q.when(toBeCurrent);
        }

        function _previous() {
            var toBeNext = Storage.get(keysHash.current);
            Storage.set(keysHash.next, toBeNext);

            var prev = Storage.get(keysHash.prev);
            Storage.set(keysHash.current, prev);

            var toBeCurrent = Storage.pop(keysHash.history);

            // todo: generate prev
            // Storage.set(keysHash.prev, prev);

            return $q.when(toBeCurrent);
        }
    }
})();