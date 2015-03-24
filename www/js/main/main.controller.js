(function (app) {
    'use strict';

    app.controller("MainCtrl", Controller);

    Controller.$inject = ['$scope'];

    function Controller($scope) {

        // initialization

        // model

        //vm.model = word;

        // public functions

        $scope.next = _next;
        $scope.prev = _prev;

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