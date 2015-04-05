// dependencies

var MongoClient = require('mongodb').MongoClient;
var Q = require('q');
var util = require('util');
var logger = require('debug')('app:db');
var errors = require('debug')('app:db:error');

// exports

module.exports = DB;

// initialization

// private methods

function DB(url, di) {
    var host = url; // todo: resolve from config
    var resolver = di.resolver;
    var container = di.container;

    this.connect = _connect;

    function _connect() {
        return Q.nfcall(MongoClient.connect, host).then(function (db) {
            logger("Connection to the server was established.");
            container.register('db', db);
            return db;
        }, function (err) {
            errors("Error during connection to the server. ", util.format(err), util.format(err.stack));
            throw new Error("Error during connection to the server.");
        });
    }
}