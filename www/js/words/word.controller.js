(function () {
    'use strict';

    angular.module('one-word.words').controller("WordCtrl", Controller);

    Controller.$inject = ['$state', 'state', 'Notifications'];

    function Controller($state, state, Notifications) {

        // todo: if next not exist => render new empty next

        var instance = this;

        // view model

        instance.vm = state;

        if (!Notifications.isAssigned(state.current))
            Notifications.sked(state.current);

        // public functions

        instance.next = _next;
        instance.previous = _previous;

        instance.known = _known;

        // private functions

        function _next() {
            $state.transitionTo('word', {name: instance.vm.next.name, direction: 'forward'});
        }

        function _previous() {
            $state.transitionTo('word', {name: instance.vm.prev.name, direction: 'back'});
        }

        function _known(word) {
            Notifications.cancel(word);
        }
    }
}());