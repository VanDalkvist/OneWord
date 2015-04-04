// dependencies

var errors = require('debug')('errors');

// initialization

var Errors = {
    criticalError: _criticalError
};

// exports

module.exports = Errors;

// private methods

function _criticalError(err) {
    errors('uncaughtException: ', util.format(err.stack));
    setTimeout(function () {
        // todo: restart
        process.exit(-1);
    }, 100);
}