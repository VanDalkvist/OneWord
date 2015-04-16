(function () {

    'use strict';

    angular.module('one-word.storage').service('LocalStorage', LocalStorageFactory);

    LocalStorageFactory.$inject = ['localStorageService'];

    function LocalStorageFactory(localStorageService) {

        // initialization

        // public functions

        this.set = _set;
        this.get = _get;
        this.pull = _pull;
        this.pop = _pop;
        this.push = _push;

        // private functions

        function _get(key) {
            return localStorageService.get(key);
        }

        function _set(key, value) {
            return localStorageService.set(key, value);
        }

        function _pull(key) {
            // todo: add check for array
            var array = _get(key);
            return array.pop();
        }

        function _pop(key) {
            // todo: add check for array
            var array = _get(key);
            if (!array) return null;

            var element = array.pop();
            _set(key, array);
            return element;
        }

        function _push(key, value) {
            var array = _get(key) || [];
            array.push(value);
            _set(key, array);
        }
    }
})();