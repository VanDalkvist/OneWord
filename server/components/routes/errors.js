// dependencies

var util = require('util');

// app dependencies

var errors = require('debug')('app:router:errors');

// exports

module.exports.bootstrap = _init;

// initialization

// private methods

function _init(instance) {
    var app = instance.get('app');
    var config = instance.get('config');

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    app.use(function (err, req, res, next) {
        errors("Internal error: \n", util.format(err.stack));
        next(err);
    });

    // development error handler
    // will print stacktrace
    if (config.isDebug(app.get('env'))) {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.send({
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: {}
        });
    });
}
