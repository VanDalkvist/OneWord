(function () {
    'use strict';

    angular.module('one-word').controller("WordCtrl", Controller);

    Controller.$inject = ['$scope', 'word'];

    function Controller($scope, word) {

        // initialization

        // model

        $scope.model = word;

        // public functions

        // private functions

    }
}());