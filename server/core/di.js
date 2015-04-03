// dependencies

// exports

module.exports = {
    new: _new
};

// initialization

// private methods

function _new() {
    var hash = {};

    return {
        container: {
            register: _register.bind(hash),
            unregister: _unregister.bind(hash)
        },
        resolver: {
            get: _get.bind(hash),
            getService: _getService.bind(hash)
        }
    };

    function _register(name, instance) {
        var hash = this;
        hash[name] = instance;
    }

    function _unregister(name) {
        var hash = this;
        delete hash[name];
    }

    function _getService(name) {
        var hash = this;
        return function () {
            return hash[name];
        }
    }

    function _get(name) {
        var hash = this;
        return hash[name];
    }
}