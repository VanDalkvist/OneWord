// dependencies

var express = require('express');
var _ = require('lodash');
var cors = require('cors');
var usersLogger = require("debug")('app:users');
var util = require('util');

var router = express.Router();

// exports

module.exports.bootstrap = _bootstrap;

// private methods

function _bootstrap(instance) {
    var app = instance.get('app');
    var Storage = instance.get('storage');

    // todo: configure cors
    // enable pre-flight request
    router.options('/register', cors());
    router.options('/configure', cors());

    router.post('/register', _register);
    router.post('/configure', _configure);

    app.use('*', _isAuthenticated);

    return router;

    function _register(req, res, next) {
        var key = req.body.uid;
        var regId = req.body.regId;
        if (!key) return next(new Error("Invalid user id."));

        usersLogger("We are in the 'register' route. Body is %s.", util.format(req.body));
        Storage.saveUser(key, regId).then(function () {
            res.status(200).send();
        }, function (err) {
            next(err);
        });
    }

    function _configure(req, res, next) {
        var key = req.body.uid;
        if (!key) return next(new Error("Invalid user id."));

        var regId = req.body.regId;
        usersLogger("We are in the 'configure' route. Body is %s.", util.format(req.body));
        Storage.updateUser(key, regId).then(function () {
            res.status(200).send();
        }, function (err) {
            next(err);
        });
    }

    function _isAuthenticated(req, res, next) {
        var authHeader = 'User-Key';
        req.userId = req.get(authHeader);
        req.user = Storage.getUser(req.userId);
        next();
    }
}