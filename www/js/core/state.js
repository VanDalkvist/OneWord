(function () {

    'use strict';

    angular.module('one-word').factory('State', Factory);

    Factory.$inject = ['$q', 'ng', 'Word', 'Storage'];

    function Factory($q, ng, Word, Storage) {
        var keysHash = {
            current: 'words:current',
            prev: 'words:prev',
            next: 'words:next',
            back: 'words:back',
            front: 'words:front'
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

            return wordPromise.then(function (current) {
                var state = {current: current, prev: undefined};
                return Word.random().$promise.then(_nextStateCallback(state));
            });
        }

        function _nextState() {
            var prev = Storage.get(keysHash.prev);
            !!prev && Storage.push(keysHash.back, prev);

            var toBePrev = Storage.get(keysHash.current);
            Storage.set(keysHash.prev, toBePrev);

            var toBeCurrent = Storage.get(keysHash.next);
            Storage.set(keysHash.current, toBeCurrent);

            var state = {current: toBeCurrent, prev: toBePrev};
            var toBeNext = Storage.pop(keysHash.front);

            var nextPromise = !!toBeNext ? $q.when(toBeNext) : Word.random().$promise;
            return nextPromise.then(_nextStateCallback(state));
        }

        function _previousState() {
            var toBeNext = Storage.get(keysHash.current);

            var next = Storage.get(keysHash.next);
            Storage.push(keysHash.front, next);

            Storage.set(keysHash.next, toBeNext);

            var toBeCurrent = Storage.get(keysHash.prev);
            Storage.set(keysHash.current, toBeCurrent);

            var toBePrev = Storage.pop(keysHash.back);
            Storage.set(keysHash.prev, toBePrev);

            return $q.when({current: toBeCurrent, prev: toBePrev, next: toBeNext});
        }

        function _nextStateCallback(state) {
            return function _next(toBeNext) {
                Storage.set(keysHash.next, toBeNext);
                return $q.when(ng.extend(state, {next: toBeNext}));
            }
        }
    }
})();