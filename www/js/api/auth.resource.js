(function () {

    angular.module('one-word.api').factory('Auth', Resource);

    Resource.$inject = ['$resource', 'Environment'];

    function Resource($resource, Environment) {
        var base = Environment.serverUrl();
        var resource = $resource(base + "/api/users/:action", {}, {
            register: {method: 'POST', params: {action: 'register'}}
        });

        return {
            register: function (uid) {
                return resource.register({uid: uid}).$promise;
            }
        }
    }
}());
