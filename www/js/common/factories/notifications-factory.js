(function () {

    'use strict';

    angular.module('one-word.common').factory('Notifications', Factory);

    Factory.$inject = ['$injector', 'Environment'];

    function Factory($injector, Environment) {
        var notificationsSettings = Environment.notifications();
        if (!notificationsSettings || !notificationsSettings.type)
            throw new Error("No 'notifications' services were configured.");

        // todo: inject from other module
        return $injector.get(notificationsSettings.type);
    }
})();