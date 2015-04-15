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
            current: _currentState,
            next: _nextState,
            previous: _previousState
        };

        /**
         * 1. get from cache if exist
         * 2. if no - get by Word resource
         * 3. put into cache
         * 4. generate next
         * @returns {Promise}
         * @private
         */
        function _currentState() {
            var current = Storage.get(keysHash.current);
            var prev = Storage.get(keysHash.prev);
            var next = Storage.get(keysHash.next);

            if (!!current) return $q.when({current: current, prev: prev, next: next});

            // todo: check current count for max value exceeded
            var wordPromise = Word.random().$promise.then(function _fillCache(word) {
                Storage.set(keysHash.current, word);
                return word;
            });

            // todo: add checking to uniqueness.
            var nextPromise = _generateNext();

            return $q.all({current: wordPromise, next: nextPromise}).then(function (result) {
                return angular.extend(result, {prev: undefined});
            });
        }

        function _nextState() {
            var prev = Storage.get(keysHash.prev);
            !!prev && Storage.push(keysHash.history, prev);

            var toBePrev = Storage.get(keysHash.current);
            Storage.set(keysHash.prev, toBePrev);

            var toBeCurrent = Storage.get(keysHash.next);
            Storage.set(keysHash.current, toBeCurrent);

            return _generateNext().then(function (toBeNext) {
                return $q.when({current: toBeCurrent, prev: toBePrev, next: toBeNext});
            });
        }

        function _previousState() {
            var toBeNext = Storage.get(keysHash.current);
            // todo: already loaded
            Storage.set(keysHash.next, toBeNext);

            var toBeCurrent = Storage.get(keysHash.prev);
            Storage.set(keysHash.current, toBeCurrent);

            var toBePrev = Storage.pop(keysHash.history);
            Storage.set(keysHash.prev, toBePrev);

            return $q.when({current: toBeCurrent, prev: toBePrev, next: toBeNext});
        }

        function _generateNext() {
            return Word.random().$promise.then(function (word) {
                Storage.set(keysHash.next, word);
                return word;
            });
        }
    }
})();