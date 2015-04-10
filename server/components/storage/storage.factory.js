// dependencies

// app dependencies

var Words = require('./storage');
var WordsMock = require('./storage.mock');

// exports

module.exports.create = _build;

// initialization

var builders = {
    mock: function (args) {
        return new WordsMock(args);
    },
    test: function (args) {
        return new WordsMock(args);
    },
    dev: function (args) {
        return new Words(args);
    },
    prod: function (args) {
        return new Words(args);
    },
    alfa: function (args) {
        return new Words(args);
    },
    beta: function (args) {
        return new Words(args);
    }
};

// private methods

function _build(env) {
    var args = Array.prototype.slice.call(arguments, 1);

    return builders[env](args);
}