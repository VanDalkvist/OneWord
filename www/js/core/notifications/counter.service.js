(function () {

    'use strict';

    angular.module('one-word.core').service('Counter', Service);

    Service.$inject = ['Storage'];

    function Service(Storage) {

        // initialization

        var keysHash = {
            number: 'counter:number'
        };

        // public functions

        this.increment = _increment;

        // private functions

        function _increment() {
            var number = Storage.get(keysHash.number);
            Storage.set(keysHash.number, ++number);
            return number;
        }
    }
})();
