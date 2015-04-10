// dependencies

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug');

// app dependencies

var config = require('./bin/config');

var DB = require('./components/core/db');
var DI = require('./components/core/di');

var job = require('./components/job');

var StorageFactory = require('./components/storage/storage.factory');

var users = require('./components/routes/users');
var words = require('./components/routes/words');
var errors = require('./components/routes/errors');

var appLogger = debug('app');
var errorsLogger = debug('app:errors');

// exports

module.exports.run = _run;
module.exports.bootstrap = _bootstrap;

// private functions

function _run() {
    job.start('./server/components/job/schedule');

    return _build()
        .then(function (di) {
            _configureExpressApp(di);
            return _provideInstance(di);
        })
        .then(function (instance) {
            _configureStatic(instance);
            _configureAPI(instance);
            return instance;
        });
}

function _build() {
    appLogger('bootstrap application... ');
    var di = DI.new();
    di.container.register('config', config);

    appLogger('configuring connection to the db... ');
    return _connect(di).then(function () {
        return di;
    });
}

function _configureExpressApp(di) {
    appLogger('starting bootstrap express application... ');
    var app = _bootstrapApp(di.resolver);

    di.container.register('app', app);
}

function _bootstrap() {
    return _build().then(_provideInstance);
}

function _provideInstance(di) {
    return di.resolver;
}

function _bootstrapApp(resolver) {
    var app = express();

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

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
        di.container.register('storage', StorageFactory.create(config.env, connection));
    });
}

/**
 * Order of middleware is important
 */
function _configureAPI(instance) {
    var app = instance.get('app');
    app.use('/api/users', users.bootstrap(instance));
    app.use('/api/words', words.bootstrap(instance));

    errors.bootstrap(instance);
}

function _configureStatic(instance) {
    var app = instance.get('app');
    // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    // view engine setup for ionic development purposes.
    app.use(express.static(path.join(__dirname, '../www')));
}