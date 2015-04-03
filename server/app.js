// dependencies

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// app dependencies

var WordProvider = require('./storage/word.provider.js');
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

    var wordProvider = new WordProvider(config.mongo.uri);
    return wordProvider.connect(di).then(function (wordsStorage) {
        di.container.register('storage', wordsStorage);

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