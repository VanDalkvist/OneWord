(function () {

    'use strict';

    angular.module('one-word.common').constant('Keys', Constant());

    function Constant() {
        return {
            Push: {
                regId: "management:user:registrationId",
                isRegistered: "management:user:isRegistered"
            }
        };
    }
})();