// dependencies

var Q = require('q');
var util = require('util');
var logger = require('debug')('app:storage');
var errors = require('debug')('app:storage:error');

// exports

module.exports = Storage;

// initialization

var max = 10;

// private methods

function Storage(db) {
    var wordsCollection = db.collection('words');
    var usersCollection = db.collection('users');

    this.next = _next;
    this.getUser = _getUser;
    this.saveUser = _saveUser;

    function _next(userId) {
        var number;

        return _getNextWordNumber(userId).then(function (wordNumber) {
            number = wordNumber;
            return Q.nfcall(wordsCollection.findOne.bind(wordsCollection), {number: wordNumber});
        }).then(function (word) {
            var next = ++number;
            usersCollection.updateOne({id: userId}, {$set: {'word.number': (next < max ? next : null)}});
            delete word.number;
            return word;
        });
    }

    function _getUser(userId) {
        return Q.nfcall(usersCollection.findOne.bind(usersCollection), {userId: userId}).then(function (res) {
            return res;
        }, function (err) {
            throw new Error("Cannot get user with id: '%s'", userId);
        });
    }

    function _saveUser(userId) {
        return Q.nfcall(usersCollection.insertOne.bind(usersCollection), {userId: userId, word: {number: 0}})
            .then(function (res) {
                return res;
            }, function (err) {
                throw new Error("Cannot save user with id: '%s'", userId);
            });
    }

    function _getNextWordNumber(userId) {
        return _getUser(userId).then(function (user) {
            return user.word.number || 0;
        }, function (err) {
            errors("Error during getting the word. ", util.format(err), util.format(err.stack));
            throw new Error("Error during getting the word.");
        });
    }
}