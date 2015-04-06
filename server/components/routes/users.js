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

    app.use('*', function (req, res, next) {
        req.userId = _.random(1, 4); // todo: provide real userId
        req.user = _getUser.call(storage, req.userId);
        next();
    });

    return router;
}

function _getUser(userId) {
    var storage = this;
    return storage.getUser(userId);
}