// dependencies

var express = require('express');
var _ = require('lodash');
var cors = require('cors');
var users = require("debug")('app:users');
var util = require('util');

var router = express.Router();

// exports

module.exports.bootstrap = _bootstrap;

// private methods

function _bootstrap(instance) {
    var app = instance.get('app');
    var Storage = instance.get('storage');

    // todo: configure cors
    router.options('/register', cors()); // enable pre-flight request
    router.post('/register', function _register(req, res, next) {
        var key = req.body.uid;
        if (!key) return next(new Error("Invalid user id."));

        users("We are in the 'register' route. Body is %s.", util.format(req.body));
        Storage.saveUser(key).then(function () {
            res.status(200).send();
        }, function (err) {
            // todo: log error
            res.status(500).send(err);
        });
    });

    app.use('*', function _isAuthenticated(req, res, next) {
        var authHeader = 'User-Key';
        req.userId = req.get(authHeader);
        req.user = _getUser.call(Storage, req.userId);
        next();
    });

    return router;
}

function _getUser(userId) {
    var storage = this;
    return storage.getUser(userId);
}