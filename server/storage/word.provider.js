// dependencies

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Q = require('q');
var util = require('util');

// exports

module.exports = WordProvider;

// initialization

var max = 10;

// private methods

function WordProvider(url) {
    var logger = console;

    var host = url;

    this.connect = _connect;

    function _connect(di) {
        var connectionPromise = Q.nfcall(MongoClient.connect, host).then(function (db) {
            logger.log("Connection to the server was established.");
            di.container.register('db', db);
            return db;
        }, function (err) {
            logger.error("Error during connection to the server. ", util.format(err), util.format(err.stack));
            throw new Error("Error during connection to the server.");
        });

        return connectionPromise.then(function (db) {
            var wordsCollection = db.collection('words');
            var usersCollection = db.collection('users');

            return {
                next: function (userId) {
                    return _getNextWordNumber.call(usersCollection, userId).then(function (wordNumber) {
                        return Q.nfcall(wordsCollection.findOne, {number: wordNumber}).then(function (word) {

                            var next = ++wordNumber;
                            usersCollection.updateOne({userId: userId}, {$set: {'word.number': (next < max ? next : null)}});

                            return word;
                        });
                    });
                }
            };
        });
    }

    function _getNextWordNumber(userId) {
        var collection = this;

        return Q.nfcall(collection.findOne, {userId: userId}, {$project: {'word.number': true}})
            .then(function (wordNumber) {
                return wordNumber || 0;
            }, function (err) {
                logger.error("Error during getting the word. ", util.format(err), util.format(err.stack));
                throw new Error("Error during getting the word.");
            });
    }
}