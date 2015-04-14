(function () {
    'use strict';

    angular.module('one-word').controller("WordCtrl", Controller);

    Controller.$inject = ['$scope', '$timeout', '$ionicSlideBoxDelegate', 'WordProvider'];

    function Controller($scope, $timeout, $ionicSlideBoxDelegate, WordProvider) {

        // todo: try controllerAs syntax

        // view model

        $scope.model = {name: "", active: 1};
        $scope.words = [];

        // todo: move to directive
        $scope.$watch('vm.current', function _updateTitle(newCurrent) {
            $scope.model.name = newCurrent.name;
        });

        WordProvider.current().then(function (state) {
            state.prev && $scope.words.push(state.prev);
            $scope.words.push(state.current);
            $scope.words.push(state.next);

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
            $timeout(function () {
                $ionicSlideBoxDelegate.enableSlide(false);
            });
        }

        function _next() {
            console.log("ionic - " + $ionicSlideBoxDelegate.currentIndex());
            if (!$scope.vm.next) return;

            _changeSlide('next').then(function (state) {
                // removes current 'prev' from the beginning of array
                $scope.words.shift();

                // adds new 'next' to the end of array
                $scope.words.push(state.next);
            });
        }

        function _previous() {
            console.log("ionic - " + $ionicSlideBoxDelegate.currentIndex());

            if (!$scope.vm.prev) return;

            _changeSlide('previous').then(function (state) {
                // adds new 'prev' to the beginning of array
                state.prev && $scope.words.unshift(state.prev);

                // removes current 'next' element
                $scope.words.pop();
            });
        }

        function _changeSlide(action) {
            return WordProvider[action]().then(function (state) {
                $ionicSlideBoxDelegate.enableSlide(true);
                $ionicSlideBoxDelegate[action]();
                $ionicSlideBoxDelegate.enableSlide(false);

                $timeout(function () {
                    $ionicSlideBoxDelegate.update();
                });
                $scope.vm = state;
                return state;
            });
        }
    }
}());