(function () {

    'use strict';

    angular.module('one-word').service('Storage', Storage);

    Storage.$inject = ['$q', 'Word'];

    function Storage($q, Word) {
        // todo: implement storage in the localStorage;
        // todo: merge with WordProvider

        return Word;
    }
})();