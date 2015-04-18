// dependencies

var express = require('express');
var cors = require('cors');

var router = express.Router();

// app dependencies

// exports

module.exports.bootstrap = _bootstrap;

// initialization

// private methods

function _bootstrap(instance) {
    var storage = instance.get('storage');

    router.options('/random', cors());
    router.get('/random', _getWord.bind(storage));

    return router;
}

function _getWord(req, res, next) {
    var userId = req.userId;
    if (!userId) return next(new Error('Unauthorized'));

    var storage = this;
    storage.getWord(userId).then(function (word) {
        res.send(word);
    }, next);
}