// dependencies

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// app dependencies

var DB = require('./core/db');
var Words = require('./storage/words');
var DI = require('./core/di');
var errors = require('./core/errors');
var config = require('./bin/config');

// exports

module.exports.run = _run;

// private functions

function _run() {
    var di = DI.new();

    var app = _bootstrapApp();
    di.container.register('app', app);

    var db = new DB(config.mongo.uri);
    return db.connect(di).then(function (connection) {
        di.container.register('storage', new Words(connection));

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

    return app;
}

function _configureAPI(app, resolver) {
    var storage = resolver.get('storage');
    app.use('/words', require('./routes/words').bootstrap(storage));

    errors.bootstrap(app);

    //var users = require('./routes/users');
    //app.use('/users', users);
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