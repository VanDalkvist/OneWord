(function () {

    angular.module('one-word').factory('Word', Resource);

    Resource.$inject = ['$resource', 'Settings'];

    function Resource($resource, Settings) {
        return $resource(Settings.serverUrl() + "/api/words/:action", {}, {
            random: {method: 'GET', params: {action: 'random'}}
        });
    }
}());
