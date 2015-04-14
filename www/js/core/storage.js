(function () {

    'use strict';

    angular.module('one-word').factory('Storage', Service);

    Service.$inject = ['$injector', 'Environment'];

    function Service($injector, Environment) {
        var storage = Environment.storage();
        if (!storage || !storage.type)
            throw new Error("No storage was configured.");

        // todo: inject from other module
        return $injector.get(storage.type);
    }
})();