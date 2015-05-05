(function () {

    'use strict';

    angular.module('one-word.core').service('State', Service);

    Service.$inject = ['$q', 'ng', 'Word', 'Storage'];

    function Service($q, ng, Word, Storage) {
        var keysHash = {
            current: 'words:current',
            //prev: 'words:prev',
            //next: 'words:next',
            //back: 'words:back',
            //front: 'words:front',
            word: function (name) {
                return 'words:cache:' + name;
            },
            prev: function (name) {
                return 'words:ref:' + name + ':prev';
            },
            next: function (name) {
                return 'words:ref:' + name + ':next';
            },
            last: 'words:last'
        };

        // public functions

        this.current = _currentState;
        this.next = _nextState;
        this.previous = _previousState;
        this.exact = _exact;

        /**
         * 1. get 'current', 'prev', 'next' from cache
         * 2. if not exist generate and put into cache
         * 3. generate next and put it into cache
         * @returns {Promise}
         */
        function _currentState() {
            //var current = Storage.get(keysHash.current);
            var last = Storage.get(keysHash.last);

            if (!!last) {
                var prevKey = Storage.get(keysHash.prev(last.name));
                var nextKey = Storage.get(keysHash.next(last.name));
                return $q.when({
                    current: last,
                    prev: !!prevKey ? Storage.get(prevKey) : null,
                    next: !!nextKey ? Storage.get(nextKey) : null
                });
            }

            var wordPromise = Word.random().then(function _fillCache(word) {
                Storage.set(keysHash.word(word.name), word);
                //Storage.setIfNotExist(keysHash.prev(word.name), null);
                Storage.set(keysHash.prev(word.name), null);
                return word;
            });

            return wordPromise.then(function (current) {
                var state = {current: current, prev: null};
                return Word.random().then(function _next(toBeNext) {
                    if (!toBeNext.name) toBeNext = null;
                    // todo: count not found state

                    var nextKey = null;
                    if (toBeNext !== null)
                        nextKey = keysHash.word(toBeNext.name);
                    //Storage.set(nextKey, toBeNext);
                    Storage.set(keysHash.next(current.name), nextKey);
                    return $q.when(ng.extend(state, {next: toBeNext}));
                });
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

        function _exact(word) {
            var toBeCurrent = Storage.get(keysHash.word(word.name));

        }

        function _nextStateCallback(state) {
            return function _next(toBeNext) {
                if (!toBeNext.name) toBeNext = null;
                // todo: count not found state

                Storage.setIfNotExist(keysHash.word(toBeNext.name), toBeNext);
                Storage.set(keysHash.next, toBeNext);
                return $q.when(ng.extend(state, {next: toBeNext}));
            }
        }
    }
})();