(function () {
    'use strict';

    angular
        .module('one-word.core', ['one-word.common', 'one-word.storage', 'one-word.api'])
        .config(Config);

    Config.$inject = [];

    function Config() {
    }
})();