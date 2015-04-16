(function () {
    'use strict';

    angular.module('one-word.words').controller("WordCtrl", Controller);

    Controller.$inject = ['$state', 'state'];

    function Controller($state, state) {

        // todo: if next not exist => render new empty next

        var instance = this;

        // view model

        this.vm = state;

        // public functions

        this.next = _next;
        this.previous = _previous;

        // private functions

        function _next() {
            $state.transitionTo('word', {name: instance.vm.next.name, direction: 'forward'});
        }

        function _previous() {
            $state.transitionTo('word', {name: instance.vm.prev.name, direction: 'back'});
        }
    }
}());