(function () {

    'use strict';

    angular.module('one-word.settings').controller('SettingsCtrl', Controller);

    Controller.$inject = ['$scope', 'Settings'];

    function Controller($scope, Settings) {

        // view model

        // initialization

        // public functions

        $scope.setWordsCount = _setWordsCount;

        // private functions

        function _setWordsCount(count) {
            Settings.setWordsCount(count);
        }
    }
})();
