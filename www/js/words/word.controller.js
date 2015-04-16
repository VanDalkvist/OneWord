(function () {
    'use strict';

    angular.module('one-word.words').controller("WordCtrl", Controller);

    Controller.$inject = ['state'];

    function Controller(state) {
        this.vm = state;
    }
}());