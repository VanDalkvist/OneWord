(function () {

    'use strict';

    angular.module('one-word.common').constant('Config', Constant());

    function Constant() {
        return {
            senderId: '{{senderId}}'
        };
    }
})();
