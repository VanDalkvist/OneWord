(function (app) {
    'use strict';

    app.controller("WordCtrl", Controller);

    Controller.$inject = ['WordService'];

    function Controller(WordService) {

        // initialization

        var vm = this;

        // model

        vm.model = WordService.current();

        // public functions

        // private functions

    }
})(angular.module('one-word'));