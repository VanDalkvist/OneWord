(function () {
    'use strict';

    angular.module('one-word').controller("WordCtrl", Controller);

    Controller.$inject = ['state'];

    function Controller(state) {
        this.vm = state;
    }
}());