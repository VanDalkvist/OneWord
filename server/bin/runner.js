var debug = require('debug')('bootstrap');
var errors = require('debug')('errors');
var application = require('../app');
var util = require('util');

process.on('uncaughtException', function (err) {
    errors('uncaughtException: ', util.format(err.stack));
    setTimeout(function () {
        // todo: restart
        process.exit(-1);
    }, 100);
});

application.run().then(function (resolver) {
    var app = resolver.get('app');

    var server = app.listen(app.get('port'), function () {
        debug('Express server listening on port ' + server.address().port);
    });
});