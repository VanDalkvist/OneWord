(function (app) {
    'use strict';

    app.controller("WordCtrl", Controller);

    Controller.$inject = ['word'];

    function Controller(word) {

        // initialization

        var vm = this;

        // model

        vm.model = word;

        // public functions

        // private functions

    }
})(angular.module('one-word'));