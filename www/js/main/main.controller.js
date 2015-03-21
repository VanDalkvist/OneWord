(function (app) {
    'use strict';

    app.controller("MainCtrl", Controller);

    Controller.$inject = [];

    function Controller() {

        // initialization

        var vm = this;

        // model

        //vm.model = word;

        // public functions

        vm.next = _next;
        vm.prev = _prev;

        // private functions

        function _next(current) {
            /* todo
            * 1. Save current as previous.
            * 2. Put next as current.
            * 3. Calculate next.
            * */
        }

        function _prev(current) {
            /* todo
             * 1. Save current as next ? Or forget about current.
             * 2. Put previous as current.
             * 3. Calculate previous (get from history).
             * */
        }
    }
})(angular.module('one-word'));