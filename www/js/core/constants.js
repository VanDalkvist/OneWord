// use strict;

angular.module('one-word')
    .provider('StorageProvider', function () {

        this.$get = StorageProvider;

        this.$get.$inject = ['localStorageService'];

        function StorageProvider(localStorageService) {
            return localStorageService;
        }
    });