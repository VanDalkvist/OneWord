(function () {

    'use strict';

    angular.module('one-word.core').service('PubSub', Service);

    Service.$inject = ['_'];

    function Service(_) {

        // initialization

        var events = {};

        // public functions

        this.publish = _publish;
        this.subscribe = _subscribe;
        this.unsubscribe = _unsubscribe;

        // private functions

        function _publish(event, data) {
            var eventObject = events[event];
            if (!eventObject) return;

            _.each(eventObject.subscribers, function (subscriber) {
                subscriber(data);
            });
        }

        function _subscribe(event, subscriber) {
            if (!events[event]) {
                events[event] = {subscribers: []};
            }

            events[event].subscribers.push(subscriber);
        }

        function _unsubscribe(event, toUnsubscribe) {
            _.remove(events[event].subscribers, function (subscriber) {
                return toUnsubscribe === subscriber;
            });
        }
    }
})();
