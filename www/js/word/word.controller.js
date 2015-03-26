(function () {
    'use strict';

    angular.module('one-word').controller("WordCtrl", Controller);

    Controller.$inject = ['$scope', '$ionicSlideBoxDelegate', 'word'];

    function Controller($scope, $ionicSlideBoxDelegate, word) {

        // initialization
        $scope.startApp = function() {
            //$state.go('main');
        };

        var words = $scope.words = [];
        $scope.model = {wordsCount: 0};
        words.push({content: word, number: ++$scope.model.wordsCount});
        words.push({content: word, number: ++$scope.model.wordsCount});
//         $scope.slideIndex = 1;
        // model

        //$scope.model = word;

        $scope.next = function () {
            if ($scope.slideIndex === $scope.words.length - 2)
                words.push({content: word, number: ++$scope.model.wordsCount});
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function () {
            if ($scope.model.wordsCount >= 1)
                $ionicSlideBoxDelegate.previous();
        };

        // public functions

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };

        // private functions

    }
}());