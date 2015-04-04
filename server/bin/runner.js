// dependencies

var debug = require('debug')('app:bootstrap');
var errors = require('debug')('app:errors');
var application = require('../app');
var util = require('util');

// app dependencies

var Errors = require('../core/errors');

process.on('uncaughtException', Errors.criticalError);

module.exports = application.run().then(function (resolver) {
    var app = resolver.get('app');

    var server = app.listen(app.get('port'), function () {
        debug('Express server listening on port ' + server.address().port);
    });
    return resolver;
}, Errors.criticalError);