(function () {
    'use strict';

    angular
        .module('one-word.management', ['one-word.common', 'one-word.storage', 'one-word.api'])
        .config(Config);

    Config.$inject = [];

    function Config() {
    }
})();