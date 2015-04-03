// dependencies

var express = require('express');
var router = express.Router();

// app dependencies

// exports

module.exports.bootstrap = _bootstrap;

// initialization

// private methods

function _bootstrap(storage) {
    router.get('/random', _getWord.bind(storage));

    return router;
}

function _getWord(req, res, next) {
    // todo: set req.user
    var storage = this;

    storage.next(req.user.id).then(function (word) {
        res.send(word);
    }, next);
}