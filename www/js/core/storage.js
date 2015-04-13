(function () {

    'use strict';

    angular.module('one-word').service('Storage', StorageService);

    StorageService.$inject = ['Settings'];

    function StorageService(Settings) {
        var storage = Settings.storage();
        if (!storage || !storage.type)
            throw new Error("No storage was configured.");

        return angular.injector([storage.module]).get(storage.type);
    }
})();