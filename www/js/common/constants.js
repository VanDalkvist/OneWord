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

    angular.module('one-word.common').constant('moment', (function Lodash() {
        return Object.freeze(moment);
    })());

    angular.module('one-word.common').constant('ionic', (function Ionic() {
        return ionic;
    })());

})();