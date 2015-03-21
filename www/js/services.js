(function (module) {

    module.factory('WordResource', WordResource);

    WordResource.$inject = ['$resource'];

    function WordResource($resource) {
        return {
            sync: _sync
        };

        function _sync() {
            return {
                current: _current,
                next: _next,
                previous: _previous
            };
        }

        function _current() {

        }

        function _next() {

        }

        function _previous() {

        }
    }

})(angular.module('starter.services', ['ngResource']));
