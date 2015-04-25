(function () {

    'use strict';

    angular.module('one-word.core').service('State', Service);

    Service.$inject = ['$q', 'ng', 'Word', 'Storage', 'Notifications'];

    function Service($q, ng, Word, Storage, Notifications) {
        var keysHash = {
            current: 'words:current',
            prev: 'words:prev',
            next: 'words:next',
            back: 'words:back',
            front: 'words:front'
        };

        // public functions

        this.current = _currentState;
        this.next = _nextState;
        this.previous = _previousState;

        /**
         * 1. get 'current', 'prev', 'next' from cache
         * 2. if not exist generate and put into cache
         * 3. generate next and put it into cache
         * @returns {Promise}
         */
        function _currentState() {
            var current = Storage.get(keysHash.current);
            var prev = Storage.get(keysHash.prev);
            var next = Storage.get(keysHash.next);

            Notifications.addSchedule();

            if (!!current) return $q.when({current: current, prev: prev, next: next});

            // todo: check current count for max value exceeded
            var currentPromise = Word.random().then(function _fillCache(word) {
                Storage.set(keysHash.current, word);
                return word;
            });

            return currentPromise.then(function (current) {
                var state = {current: current, prev: undefined};
                return Word.random().then(_nextStateCallback(state));
            });
        }

        /**
         * 1. get 'prev' from cache if exist and put it to 'back' history
         * 2. put 'current' to be 'prev'
         * 3. put 'next' to be 'current'
         * 4. pop from 'front' history if exist and put it as 'next'
         * 5. generate 'next' if not exists in 'front' history
         * @returns {Promise}
         */
        function _nextState() {
            var prev = Storage.get(keysHash.prev);
            !!prev && Storage.push(keysHash.back, prev);

            var toBePrev = Storage.get(keysHash.current);
            Storage.set(keysHash.prev, toBePrev);

            var toBeCurrent = Storage.get(keysHash.next);
            Storage.set(keysHash.current, toBeCurrent);

            var state = {current: toBeCurrent, prev: toBePrev};
            var toBeNext = Storage.pop(keysHash.front);

            var nextPromise = !!toBeNext ? $q.when(toBeNext) : Word.random();
            return nextPromise.then(_nextStateCallback(state));
        }

        /**
         * 1. get 'next' and put it to 'front' history
         * 2. put 'current' to be 'next'
         * 3. put 'prev' to be 'current'
         * 4. pop from 'back' history and put it as 'prev'
         * @returns {Promise}
         */
        function _previousState() {
            var next = Storage.get(keysHash.next);
            !!next && Storage.push(keysHash.front, next);

            var toBeNext = Storage.get(keysHash.current);
            Storage.set(keysHash.next, toBeNext);

            var toBeCurrent = Storage.get(keysHash.prev);
            Storage.set(keysHash.current, toBeCurrent);

            var toBePrev = Storage.pop(keysHash.back);
            Storage.set(keysHash.prev, toBePrev);

            return $q.when({current: toBeCurrent, prev: toBePrev, next: toBeNext});
        }

        function _nextStateCallback(state) {
            return function _next(toBeNext) {
                if (!toBeNext.name) toBeNext = null;
                // todo: count not found state

                Storage.set(keysHash.next, toBeNext);
                return $q.when(ng.extend(state, {next: toBeNext}));
            }
        }
    }
})();