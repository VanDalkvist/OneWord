(function () {

    'use strict';

    angular.module('one-word.common').factory('Storage', Factory);

    Factory.$inject = ['$injector', 'Environment'];

    function Factory($injector, Environment) {
        var storage = Environment.storage();
        if (!storage || !storage.type)
            throw new Error("No storage was configured.");

        // todo: inject from other module
        return $injector.get(storage.type);
    }
})();