(function () {
    'use strict';

    angular
        .module('one-word.management', ['one-word.core', 'one-word.storage', 'one-word.api'])
        .config(Config);

    Config.$inject = [];

    function Config() {
    }
})();