// dependencies

var express = require('express');
var router = express.Router();
var _ = require('lodash');

// exports

module.exports.bootstrap = _bootstrap;

// private methods

function _bootstrap(instance) {
    var app = instance.get('app');
    var storage = instance.get('storage');

    router.post('register', function _register(req, res, next) {
        var key = req.body.uid;

        storage.saveUser(key).then(function (res) {
            res.status(200).send();
        }, function (err) {
            // todo: log error
            res.status(500).send(err);
        });
    });

    app.use('*', function _isAuthenticated(req, res, next) {
        var authHeader = 'User-Key';
        req.userId = req.get(authHeader);
        req.user = _getUser.call(storage, req.userId);
        next();
    });

    return router;
}

function _getUser(userId) {
    var storage = this;
    return storage.getUser(userId);
}