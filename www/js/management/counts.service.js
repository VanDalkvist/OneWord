(function () {

    'use strict';

    angular.module('one-word.management').service('Counts', Service);

    Service.$inject = ['Storage'];

    function Service(Storage) {

        // initialization

        var keysHash = {
            count: 'management:counts:current',
            max: 'settings:max-count'
        };

        // public functions

        this.current = _current;
        this.increment = _increment;
        this.isExceeded = _isExceeded;

        // private functions

        function _current() {
            return Storage.get(keysHash.count);
        }

        function _increment() {
            var count = Storage.get(keysHash.count);
            Storage.set(keysHash.count, ++count);
            return count;
        }

        function _isExceeded() {
            var count = Storage.get(keysHash.count);
            var max = Storage.get(keysHash.max);
            return count <= max;
        }
    }
})();
