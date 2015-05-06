(function () {

    'use strict';

    angular.module('one-word.core').service('State', Service);

    Service.$inject = ['$q', 'ng', 'Word', 'Storage'];

    function Service($q, ng, Word, Storage) {
        var keysHash = {
            current: 'words:current',
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
            var last = Storage.get(keysHash.last);

            if (!!last) return _getLastState(last);

            var wordPromise = Word.random().then(_saveCurrent);

            return wordPromise.then(_buildElements);
        }

        function _getLastState(lastWord) {
            var prevKey = Storage.get(keysHash.prev(lastWord.name));
            var nextKey = Storage.get(keysHash.next(lastWord.name));
            return $q.when({
                current: lastWord,
                prev: !!prevKey ? Storage.get(prevKey) : null,
                next: !!nextKey ? Storage.get(nextKey) : null
            });
        }

        function _saveCurrent(word) {
            Storage.set(keysHash.word(word.name), word);
            Storage.set(keysHash.prev(word.name), null);
            Storage.set(keysHash.last, word);
            return word;
        }

        function _buildElements(last) {
            var toBeNextKey = Storage.get(keysHash.next(last.name));
            var toBeNextPromise = toBeNextKey !== null ? $q.when(Storage.get(toBeNextKey)) : Word.random();

            return _buildState(toBeNextPromise, last);
        }

        function _buildState(nextPromise, last) {
            return nextPromise
                .then(_saveNext(last))
                .then(function (toBeNext) {
                    return _getLastState(last);
                });
        }

        function _saveNext(toBeCurrent) {
            return function (toBeNext) {
                if (!toBeNext.name) toBeNext = null;
                // todo: count not found state

                var nextKey = _buildNextKey(toBeNext);

                Storage.set(keysHash.next(toBeCurrent.name), nextKey);
                Storage.set(nextKey, toBeNext);
                !!toBeNext && Storage.set(keysHash.prev(toBeNext.name), keysHash.word(toBeCurrent.name));

                return toBeNext;
            }
        }

        function _buildNextKey(toBeNext) {
            if (toBeNext === null) return null;

            return keysHash.word(toBeNext.name);
        }

        function _nextState() {
            var last = Storage.get(keysHash.last);

            var toBeCurrentKey = Storage.get(keysHash.next(last.name));
            if (!toBeCurrentKey) {
                // todo: empty state
                return;
            }
            var toBeCurrent = Storage.get(toBeCurrentKey);

            Storage.set(keysHash.last, toBeCurrent);

            return _buildElements(toBeCurrent);
        }

        /**
         * 1. get 'next' and put it to 'front' history
         * 2. put 'current' to be 'next'
         * 3. put 'prev' to be 'current'
         * 4. pop from 'back' history and put it as 'prev'
         * @returns {Promise}
         */
        function _previousState() {
            var last = Storage.get(keysHash.last);

            var toBeCurrentKey = Storage.get(keysHash.prev(last.name));
            if (!toBeCurrentKey) {
                // todo: empty state
                return;
            }

            var toBeCurrent = Storage.get(toBeCurrentKey);

            Storage.set(keysHash.last, toBeCurrent);

            return _getLastState(toBeCurrent);
        }

        function _exact(wordName) {
            var toBeCurrent = Storage.get(keysHash.word(wordName));

            Storage.set(keysHash.last, toBeCurrent);

            return _getLastState(toBeCurrent);
        }
    }
})();