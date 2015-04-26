(function () {
    'use strict';

    angular.module('one-word.common').constant('uuid', (function Uuid() {
        return Object.freeze(uuid);
    })());

    angular.module('one-word.common').constant('ng', (function NG() {
        return Object.freeze(angular);
    })());

    angular.module('one-word.common').constant('_', (function Lodash() {
        return Object.freeze(_);
    })());

})();