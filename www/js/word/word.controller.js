(function () {
    'use strict';

    angular.module('one-word').controller("WordCtrl", Controller);

    Controller.$inject = ['$scope', '$timeout', '$ionicSlideBoxDelegate', 'Storage'];

    function Controller($scope, $timeout, $ionicSlideBoxDelegate, Storage) {

        // initialization

        _init();

        // public functions

        $scope.next = _next;
        $scope.previous = _previous;

        // private functions

        function _init() {
            $scope.words = [];
            $scope.model = {wordsCount: 0};

            $scope.words.push({content: Storage.random(), number: ++$scope.model.wordsCount});
            $scope.words.push({content: Storage.random(), number: ++$scope.model.wordsCount});

            $scope.slideIndex = 0;

            $timeout(function () {
                $ionicSlideBoxDelegate.enableSlide(false);
            });
        }

        function _next() {
            $ionicSlideBoxDelegate.enableSlide(true);
            $ionicSlideBoxDelegate.next();
            $ionicSlideBoxDelegate.enableSlide(false);

            console.log("ionic - " + $ionicSlideBoxDelegate.currentIndex() + "; words = " + $scope.model.wordsCount);

            $timeout(function () {
                if ($ionicSlideBoxDelegate.currentIndex() === $scope.words.length - 1) {
                    $scope.words.push({content: Storage.random(), number: ++$scope.model.wordsCount});
                    $ionicSlideBoxDelegate.update();
                }
            });
        }

        function _previous() {
            if ($scope.model.wordsCount >= 1) {
                $ionicSlideBoxDelegate.enableSlide(true);
                $ionicSlideBoxDelegate.previous();
                $ionicSlideBoxDelegate.enableSlide(false);
            }
        }
    }
}());