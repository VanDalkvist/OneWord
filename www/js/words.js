(function (module) {

    module.factory('Word', Resource);

    Resource.$inject = ['$resource'];

    function Resource($resource) {
        return $resource("api/words/:action", {}, {
            random: {method: 'GET', params: {action: 'random'}}
        });
    }
})(angular.module('one-word.words', ['ngResource']));
