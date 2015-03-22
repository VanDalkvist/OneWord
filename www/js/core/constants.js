// use strict;

angular.provider('Storage', function () {

    this.$get = StorageProvider;

    this.$get.$inject = ['localStorageService'];

    function StorageProvider(localStorageService) {
        return localStorageService;
    }
});