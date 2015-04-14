(function () {
    'use strict';

    angular.module('one-word').controller("WordCtrl", Controller);

    Controller.$inject = ['$scope', '$timeout', '$ionicSlideBoxDelegate', 'WordProvider'];

    function Controller($scope, $timeout, $ionicSlideBoxDelegate, WordProvider) {

        // todo: try controllerAs syntax

        // view model

        WordProvider.current().then(function (state) {
            $scope.vm = state;
        });

        // initialization

        _init();

        // public functions

        $scope.actions = {
            next: _next,
            previous: _previous
        };

        // private functions

        function _init() {
            //$scope.model = {wordsCount: 0};

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
                    $scope.vm = WordProvider.next();
                    $ionicSlideBoxDelegate.update();
                }
            });
        }

        function _previous() {
            $scope.vm = WordProvider.prev();
            if ($scope.model.wordsCount >= 1) {
                $ionicSlideBoxDelegate.enableSlide(true);
                $ionicSlideBoxDelegate.previous();
                $ionicSlideBoxDelegate.enableSlide(false);
            }
        }
    }
}());