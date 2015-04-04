// dependencies

var MongoClient = require('mongodb').MongoClient;
var Q = require('q');
var util = require('util');

// exports

module.exports = DB;

// initialization

// private methods

function DB(url) {
    var logger = console;

    var host = url;

    this.connect = _connect;

    function _connect(di) {
        return Q.nfcall(MongoClient.connect, host).then(function (db) {
            logger.log("Connection to the server was established.");
            di.container.register('db', db);
            return db;
        }, function (err) {
            logger.error("Error during connection to the server. ", util.format(err), util.format(err.stack));
            throw new Error("Error during connection to the server.");
        });
    }
}