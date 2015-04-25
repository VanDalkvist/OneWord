(function () {

    'use strict';

    angular.module('one-word.common').factory('Storage', Factory);

    Factory.$inject = ['$injector', 'Environment'];

    function Factory($injector, Environment) {
        var storageSettings = Environment.storage();
        if (!storageSettings || !storageSettings.type)
            throw new Error("No 'storage' services were configured.");

        // todo: inject from other module
        return $injector.get(storageSettings.type);
    }
})();