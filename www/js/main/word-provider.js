(function () {

    'use strict';

    angular.module('one-word').factory('WordProvider', Factory);

    Factory.$inject = ['$q', 'Word', 'Storage'];

    function Factory($q, Word, Storage) {
        var keysHash = {
            current: 'words:current',
            prev: 'words:prev',
            next: 'words:next',
            history: 'words:history'
        };

        return {
            current: _current,
            next: _next,
            previous: _previous
        };

        /**
         * 1. get from cache if exist
         * 2. if no - get by Word resource
         * 3. put into cache
         * 4. generate next
         * @returns {Promise}
         * @private
         */
        function _current() {
            var current = Storage.get(keysHash.current);
            if (!!current) return $q.when(current);

            // todo: check current count for max value exceeded
            return Word.get().$promise.then(function _fillCache(word) {
                Storage.set(keysHash.current, word);

                // todo: add checking to uniqueness.
                _generateNext();

                return word;
            });
        }

        /**
         *
         * @returns {Promise}
         * @private
         */
        function _next() {
            var current = Storage.get(keysHash.current);
            var prev = Storage.get(keysHash.prev);

            Storage.push(keysHash.history, prev);
            Storage.set(keysHash.prev, current);

            var toBeCurrent = Storage.get(keysHash.next);
            Storage.set(keysHash.current, toBeCurrent);

            _generateNext();

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

        function _generateNext() {
            return Word.get().$promise.then(function (word) {
                Storage.set(keysHash.next, word);
                return word;
            });
        }
    }
})();