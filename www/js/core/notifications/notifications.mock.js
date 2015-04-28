(function () {

    'use strict';

    angular.module('one-word.core').service('NotificationsMock', Service);

    Service.$inject = [];

    function Service() {

        // initialization

        // public functions

        this.sked = _addSchedule;
        this.cancel = _removeFromSchedule;
        this.isAssigned = _scheduleExists;

        // private functions

        function _addSchedule(word) {
        }

        function _removeFromSchedule(word) {
        }

        function _scheduleExists(word) {
        }
    }
})();
