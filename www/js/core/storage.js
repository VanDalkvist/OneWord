(function () {

    'use strict';

    angular.module('one-word').service('Storage', Service);

    Service.$inject = ['Environment'];

    function Service(Environment) {
        var storage = Environment.storage();
        if (!storage || !storage.type)
            throw new Error("No storage was configured.");

        return angular.injector([storage.module]).get(storage.type);
    }
})();