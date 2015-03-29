(function () {
    'use strict';

    angular.module('one-word').controller("WordCtrl", Controller);

    Controller.$inject = ['$scope', '$timeout', '$ionicSlideBoxDelegate', 'Storage', 'word'];

    function Controller($scope, $timeout, $ionicSlideBoxDelegate, Storage, word) {

        // initialization
        $scope.startApp = function () {
            //$state.go('main');
        };

        _init();

        $scope.next = function () {
            $ionicSlideBoxDelegate.enableSlide(true);
            $ionicSlideBoxDelegate.next();
            $ionicSlideBoxDelegate.enableSlide(false);
            console.log("ion - " + $ionicSlideBoxDelegate.currentIndex() + "; words = " + $scope.model.wordsCount);
            $timeout(function () {
                if ($ionicSlideBoxDelegate.currentIndex() === $scope.words.length - 1) {
                    Storage.add({content: word, number: ++$scope.model.wordsCount});
                    $ionicSlideBoxDelegate.update();
                }
            });
        };

        $scope.previous = function () {
            if ($scope.model.wordsCount >= 1) {
                $ionicSlideBoxDelegate.enableSlide(true);
                $ionicSlideBoxDelegate.previous();
                $ionicSlideBoxDelegate.enableSlide(false);
            }
        };

        // public functions

        // private functions

        function _init() {
            $scope.words = Storage.all();
            $scope.model = {wordsCount: 0};
            Storage.add({content: word, number: ++$scope.model.wordsCount});
            Storage.add({content: word, number: ++$scope.model.wordsCount});
            $scope.slideIndex = 0;

            $timeout(function () {
                $ionicSlideBoxDelegate.enableSlide(false);
            });
        }
    }
}());