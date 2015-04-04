// dependencies

var debug = require('debug')('bootstrap');
var errors = require('debug')('errors');
var application = require('../app');
var util = require('util');

// app dependencies

var Errors = require('../core/errors');

process.on('uncaughtException', Errors.criticalError);

application.run().then(function (resolver) {
    var app = resolver.get('app');

    var server = app.listen(app.get('port'), function () {
        debug('Express server listening on port ' + server.address().port);
    });
}, Errors.criticalError);