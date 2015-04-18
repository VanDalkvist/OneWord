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

    this.getWord = _getWord;
    this.getUser = _getUser;
    this.saveUser = _saveUser;

    // todo: clean
    function _getWord(userId) {
        var number;

        return _getNextWordNumber(userId).then(function (wordNumber) {
            number = wordNumber;
            var deferred = Q.defer();

            wordsCollection.findOne({number: wordNumber}, function (err, res) {
                if (err) return deferred.reject(err);
                deferred.resolve(res);
            });

            return deferred.promise;
        }).then(function (word) {
            var next = ++number;
            usersCollection.updateOne({id: userId}, {$set: {'word.number': (next < max ? next : null)}});
            delete word.number;
            return word;
        });
    }

    function _getUser(userId) {
        var deferred = Q.defer();

        usersCollection.findOne({userId: userId}, function (err, res) {
            if (err) return deferred.reject(new Error("Cannot get user with id: '%s'", userId));

            deferred.resolve(res);
        });

        return deferred.promise;
    }

    function _saveUser(userId) {
        var deferred = Q.defer();

        usersCollection.insertOne({userId: userId, word: {number: 0}}, function (err, res) {
            if (err) return deferred.reject(new Error("Cannot save user with id: '%s'", userId));
            deferred.resolve({});
        });

        return deferred.promise;
    }

    function _getNextWordNumber(userId) {
        return _getUser(userId).then(function (user) {
            return 0;
            //return user.word.number || 0;
        }, function (err) {
            errors("Error during getting the word. ", util.format(err), util.format(err.stack));
            throw new Error("Error during getting the word.");
        });
    }
}