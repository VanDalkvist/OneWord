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

    function _next(userId) {
        var number;

        return _getNextWordNumber.call(usersCollection, userId).then(function (wordNumber) {
            number = wordNumber;
            return Q.nfcall(wordsCollection.findOne, {number: wordNumber});
        }).then(function (word) {
            var next = ++number;
            usersCollection.updateOne({id: userId}, {$set: {'word.number': (next < max ? next : null)}});
            delete word.number;
            return word;
        });
    }

    function _getNextWordNumber(userId) {
        var collection = this;

        return Q.nfcall(collection.findOne, {userId: userId}, {$project: {'word.number': true}})
            .then(function (wordNumber) {
                return wordNumber || 0;
            }, function (err) {
                errors("Error during getting the word. ", util.format(err), util.format(err.stack));
                throw new Error("Error during getting the word.");
            });
    }
}