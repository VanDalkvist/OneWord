(function () {
    'use strict';

    angular.module('one-word').controller("WordCtrl", Controller);

    Controller.$inject = ['$scope', '$ionicSlideBoxDelegate', 'Storage', 'word'];

    function Controller($scope, $ionicSlideBoxDelegate, Storage, word) {

        // initialization
        $scope.startApp = function () {
            //$state.go('main');
        };

        $scope.words = Storage.all();
        $scope.model = {wordsCount: 0};
        Storage.add({content: word, number: ++$scope.model.wordsCount});
        Storage.add({content: word, number: ++$scope.model.wordsCount});
        $scope.slideIndex = 0;
        // model

        //$scope.model = word;

        $scope.next = function () {
            if ($ionicSlideBoxDelegate.currentIndex() === $scope.words.length - 1) {
                Storage.add({content: word, number: ++$scope.model.wordsCount});
                $ionicSlideBoxDelegate.update();
            }
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function () {
            if ($scope.model.wordsCount >= 1)
                $ionicSlideBoxDelegate.previous();
        };

        $scope.onSwipeLeft = function () {
            $scope.swipe = 'left';
        };

        $scope.onSwipeRight = function () {
            $scope.swipe = 'right';
        };

        // public functions

        // Called each time the slide changes
        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;

            if ($scope.swipe === 'left') {
                if ($ionicSlideBoxDelegate.currentIndex() === $scope.words.length - 1) {
                    Storage.add({content: word, number: ++$scope.model.wordsCount});
                    $ionicSlideBoxDelegate.update();
                }
                $scope.swipe = '';
            }
        };

        // private functions

    }
}());