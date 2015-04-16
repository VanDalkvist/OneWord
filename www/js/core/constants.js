(function () {
    'use strict';

    angular.module('one-word.core').constant('uuid', (function Uuid() {
        return uuid;
    })());

    angular.module('one-word.core').constant('ng', (function NG() {
        return angular;
    })());

})();