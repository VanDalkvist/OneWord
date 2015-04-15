(function () {
    'use strict';

    angular.module('one-word').controller("WordCtrl", Controller);

    Controller.$inject = ['$scope', '$timeout', '$stateParams', '$state', '$ionicSlideBoxDelegate', 'WordProvider', 'state'];

    function Controller($scope, $timeout, $stateParams, $state, $ionicSlideBoxDelegate, WordProvider, state) {

        // todo: try controllerAs syntax

        // view model

        //$scope.model = {name: "", active: 1};
        //$scope.words = [];

        // todo: move to directive
        //$scope.$watch('vm.current', function _updateTitle(newCurrent) {
        //    if (!newCurrent) return;
        //    $scope.model.name = newCurrent.name;
        //});

        $scope.vm = state;
        //WordProvider.current().then(function (state) {
        //    //if (!!state.prev) {
        //    //$scope.words.push(state.prev);
        //    //} else
        //    //$timeout(function () {
        //    //    $scope.model.active = 0;
        //    //});
        //    //$scope.words.push(state.current);
        //    //$scope.words.push(state.next);
        //
        //});

        // initialization

        _init();

        // public functions

        //$scope.actions = {
        //    next: _next,
        //    previous: _previous
        //};

        // private functions

        function _init() {
            //$timeout(function () {
            //    $ionicSlideBoxDelegate.enableSlide(false);
            //});
        }

        function _next() {
            console.log("next: before: ionic - %d, count - %d", $ionicSlideBoxDelegate.currentIndex(), $scope.words.length);

            if (!$scope.vm.next) return;

            _changeSlide('next').then(function (state) {
                // removes current 'prev' from the beginning of array
                if ($scope.vm.prev) {
                    $scope.words.shift();
                    $timeout(function () {
                        $scope.model.active = 1;
                    });
                }

                // adds new 'next' to the end of array
                $scope.words.push(state.next);

                $scope.vm = state;

                console.log("next: after: ionic - %d, count - %d", $ionicSlideBoxDelegate.currentIndex(), $scope.words.length);
            });
        }

        function _previous() {
            console.log("previous: before: ionic - %d, count - %d", $ionicSlideBoxDelegate.currentIndex(), $scope.words.length);

            if (!$scope.vm.prev) return;

            _changeSlide('previous').then(function (state) {
                // adds new 'prev' to the beginning of array
                state.prev && $scope.words.unshift(state.prev);

                // removes current 'next' element
                $scope.words.pop();

                $scope.vm = state;

                console.log("previous: after: ionic - %d, count - %d", $ionicSlideBoxDelegate.currentIndex(), $scope.words.length);
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
                return state;
            });
        }
    }
}());