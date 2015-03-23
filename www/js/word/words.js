(function () {

    angular.module('one-word')
        .factory('Word', Resource);

    Resource.$inject = ['$resource'];

    function Resource($resource) {
        return $resource("api/words/:action", {}, {
            random: {method: 'GET', params: {action: 'random'}}
        });
    }
}());
