(function () {

    'use strict';

    angular.module('one-word.common').factory('Notifications', Factory);

    Factory.$inject = ['$window', '$injector', 'Environment'];

    function Factory($window, $injector, Environment) {
        var notificationsSettings = Environment.notifications();
        var injectIsAllowed = (notificationsSettings && $window.cordova);

        var type = injectIsAllowed ? notificationsSettings.type : 'NotificationsMock';

        // todo: inject from other module
        return $injector.get(type);
    }
})();