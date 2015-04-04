// dependencies

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// app dependencies

var DB = require('./core/db');
var DI = require('./core/di');

var Words = require('./storage/storage');
var WordsMock = require('./storage/storage.mock');
var config = require('./bin/config');

var users = require('./routes/users');
var words = require('./routes/words');
var errors = require('./routes/errors');

// exports

module.exports.run = _run;

// private functions

function _run() {
    var di = DI.new();

    var app = _bootstrapApp();
    di.container.register('app', app);

    var db = new DB(config.mongo.uri, di);
    return db.connect().then(function (connection) {
        var storage = config.debug.mock ? new WordsMock() : new Words(connection);
        di.container.register('storage', storage);

        _configureAPI(app, di.resolver);

        return di.resolver;
    });
}

function _bootstrapApp() {
    var app = express();

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    _configureStatic(app);

    app.set('port', config.port);
    app.set('env', config.env);

    return app;
}

function _configureAPI(app, resolver) {
    app.use('/api/users', users.bootstrap(resolver));
    app.use('/api/words', words.bootstrap(resolver));

    errors.bootstrap(app);
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