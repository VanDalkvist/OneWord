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

function DB(url) {
    this.connect = _connect;

    function _connect() {
        return Q.nfcall(MongoClient.connect, url).then(function (db) {
            logger("Connection to the server was established.");
            return db;
        }, function (err) {
            errors("Error during connection to the server. ", util.format(err), util.format(err.stack));
            throw new Error("Error during connection to the server.");
        });
    }
}