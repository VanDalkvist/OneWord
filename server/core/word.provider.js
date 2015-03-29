// dependencies

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

// exports

module.exports = MongoWordProvider;

// initialization

// private methods

function MongoWordProvider(host, port) {

    var db = new Db('node-mongo-blog', new Server(host, port, {auto_reconnect: true}, {}));
    db.open(function () {
        
    });

    this.get = function _get(word) {
    };

    this.random = function _random() {
    };

    this.getForDay = function _random(day) {
    };
}