// dependencies

var errors = require('debug')('errors');

// exports

module.exports = Errors;

// initialization

var Errors = {
    criticalError: _criticalError
};

// private methods

function _criticalError(err) {
    errors('uncaughtException: ', util.format(err.stack));
    setTimeout(function () {
        // todo: restart
        process.exit(-1);
    }, 100);
}