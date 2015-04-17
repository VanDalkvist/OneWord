// dependencies

// app dependencies

var Words = require('./storage');
var WordsMock = require('./storage.mock');

// exports

module.exports.create = _build;

// initialization

var builders = {
    mock: function (args) {
        return _create(WordsMock, args);
    },
    test: function (args) {
        return _create(WordsMock, args);
    },
    dev: function (args) {
        return _create(Words, args);
    },
    prod: function (args) {
        return _create(Words, args);
    },
    alfa: function (args) {
        return _create(Words, args);
    },
    beta: function (args) {
        return _create(Words, args);
    }
};

// private methods

function _build(env) {
    var args = Array.prototype.slice.call(arguments, 1);

    return builders[env](args);
}

function _create(constructor, args) {
    // http://www.ecma-international.org/ecma-262/5.1/#sec-13.2.2
    var instance = Object.create(constructor.prototype);
    var result = constructor.apply(instance, args);

    return (result !== null && typeof result === 'object') ? result : instance;
}