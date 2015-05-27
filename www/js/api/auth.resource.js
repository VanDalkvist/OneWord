(function () {

    angular.module('one-word.api').factory('Auth', Resource);

    Resource.$inject = ['$resource', 'Environment'];

    function Resource($resource, Environment) {
        var base = Environment.serverUrl();
        var resource = $resource(base + "/api/users/:action", {}, {
            register: {method: 'POST', params: {action: 'register'}},
            configure: {method: 'POST', params: {action: 'configure'}}
        });

        return {
            register: function (uid, regId) {
                return resource.register({uid: uid, regId: regId}).$promise;
            },
            configure: function (uid, regId) {
                return resource.configure({uid: uid, regId: regId}).$promise;
            }
        }
    }
}());
