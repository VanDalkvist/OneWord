(function () {
    'use strict';

    angular.module('one-word').constant('uuid', (function Uuid() {
        return uuid;
    })());

    angular.module('one-word').constant('ng', (function NG() {
        return angular;
    })());

})();