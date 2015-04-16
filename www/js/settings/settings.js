(function () {

    'use strict';

    angular.module('one-word.settings').service('Settings', Service);

    Service.$inject = ['Storage'];

    function Service(Storage) {

        // initialization

        var keysHash = {
            count: 'settings:max-count'
        };

        // public functions

        this.setWordsCount = _setWordsCount;

        // private functions

        function _setWordsCount(count) {
            Storage.set(keysHash.count, count);
        }
    }
})();
