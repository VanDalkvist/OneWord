(function () {
    'use strict';

    angular
        .module('one-word.api', ['ngResource', 'one-word.core'])
        .config(Config);

    Config.$inject = [];

    function Config() {
    }
})();