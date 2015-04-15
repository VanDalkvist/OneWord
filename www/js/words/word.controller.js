(function () {
    'use strict';

    angular.module('one-word').controller("WordCtrl", Controller);

    Controller.$inject = ['$scope', 'state'];

    function Controller($scope, state) {

        // todo: try controllerAs syntax

        // view model

        $scope.vm = state;

        // initialization

        _init();

        // public functions

        // private functions

        function _init() {

        }
    }
}());