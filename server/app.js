// dependencies

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// app dependencies

var config = require('./bin/config');

var DB = require('./components/core/db');
var DI = require('./components/core/di');

var Words = require('./components/storage/storage');
var WordsMock = require('./components/storage/storage.mock');

var users = require('./components/routes/users');
var words = require('./components/routes/words');
var errors = require('./components/routes/errors');

// exports

module.exports.run = _run;

// private functions

function _run() {
    var di = DI.new();
    di.container.register('config', config);

    var app = _bootstrapApp(di.resolver);
    di.container.register('app', app);

    return _connect(di).then(function () {
        _configureAPI(di.resolver);
    }).then(function () {
        return di.resolver;
    });
}

function _bootstrapApp(resolver) {
    var app = express();

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    _configureStatic(app);

    var config = resolver.get('config');
    app.set('port', config.port);
    app.set('env', config.env);

    return app;
}

function _connect(di) {
    var config = di.resolver.get('config');
    var db = new DB(config.mongo.uri);
    return db.connect().then(function (connection) {
        di.container.register('db', connection);
        var storage = config.debug.mock ? new WordsMock() : new Words(connection);
        di.container.register('storage', storage);
    });
}

/**
 * Order of middleware is important
 */
function _configureAPI(resolver) {
    var app = resolver.get('app');
    app.use('/api/users', users.bootstrap(resolver));
    app.use('/api/words', words.bootstrap(resolver));

    errors.bootstrap(resolver);
}

function _configureStatic(app) {
    // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    // view engine setup for ionic development purposes.
    app.use(express.static(path.join(__dirname, '../www')));
}