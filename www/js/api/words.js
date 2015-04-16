(function () {

    angular.module('one-word.api').factory('Word', Resource);

    Resource.$inject = ['$resource', 'Environment'];

    function Resource($resource, Environment) {
        var base = Environment.serverUrl();
        var resource = $resource(base + "/api/words/:action", {}, {
            random: {method: 'GET', params: {action: 'random'}}
        });

        return {
            random: resource.random().$promise
        }
    }
}());
