(function () {
    'use strict';

    angular.module('one-word.common').constant('uuid', (function Uuid() {
        return uuid;
    })());

    angular.module('one-word.common').constant('ng', (function NG() {
        return angular;
    })());

})();