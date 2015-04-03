var debug = require('debug')('init');
var application = require('../app');
var util = require('util');

process.on('uncaughtException', function (err) {
    console.log('Error: ', util.format(err.stack));
    setTimeout(function () {
        process.exit(-1);
    }, 100);
});

application.run().then(function (resolver) {
    var app = resolver.get('app');

    var server = app.listen(app.get('port'), function () {
        debug('Express server listening on port ' + server.address().port);
    });
});