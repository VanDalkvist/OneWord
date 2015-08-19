(function () {

    'use strict';

    angular.module('one-word.core').service('PubSub', Service);

    Service.$inject = ['$log', '_'];

    function Service($log, _) {

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

            $log.log("Event '" + event + "' was published.");

            _.each(eventObject.subscribers, function (subscriber) {
                subscriber(data);
            });
        }

        function _subscribe(event, subscriber) {
            if (!events[event]) {
                events[event] = {subscribers: []};
            }

            events[event].subscribers.push(subscriber);
            $log.log("Subscription to event '" + event + "' was added.");
        }

        function _unsubscribe(event, toUnsubscribe) {
            _.remove(events[event].subscribers, function (subscriber) {
                return toUnsubscribe === subscriber;
            });
            $log.log("Subscription to event '" + event + "' was removed.");
        }
    }
})();
