(function () {
    'use strict';

    angular.module('one-word.common').constant('uuid', (function Uuid() {
        return uuid;
    })());

    angular.module('one-word.common').constant('ng', (function NG() {
        return angular;
    })());

    angular.module('one-word.common').constant('_', (function Lodash() {
        return _;
    })());

})();