(function () {

    'use strict';

    angular.module('one-word').factory('LocalStorage', LocalStorageFactory);

    LocalStorageFactory.$inject = [];

    function LocalStorageFactory() {

        // initialization

        // todo: implement storage in the localStorage

        // public functions

        this.set = _set;
        this.get = _get;
        this.add = _add;
        this.pull = _pull;
        this.pop = _pop;
        this.push = _push;

        // private functions

        function _get() {

        }

        function _set() {

        }

        function _add() {

        }

        function _pull() {

        }

        function _pop() {

        }

        function _push() {

        }
    }
})();