// dependencies

var Q = require('q');
var util = require('util');
var logger = require('debug')('app:storage');
var errors = require('debug')('app:storage:error');

// exports

module.exports = Storage;

// initialization

// todo: configure max
var max = 10;

// private methods

function Storage(db) {
    var wordsCollection = db.collection('words');
    var usersCollection = db.collection('users');

    this.getWord = _getWord;
    this.getUser = _getUser;
    this.saveUser = _createUser;

    // todo: clean
    function _getWord(userId) {
        return _getNextWordNumber(userId).then(function (wordNumber) {
            if (wordNumber == null) return null;

            var deferred = Q.defer();

            wordsCollection.findOne({number: wordNumber}, function (err, res) {
                if (err) return deferred.reject(err);

                delete res._id;
                delete res.number;
                deferred.resolve(res);
            });

            return deferred.promise;
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

    function _createUser(userId) {
        var deferred = Q.defer();

        var userModel = {userId: userId, word: {number: 0}};
        usersCollection.insertOne(userModel, function (err, res) {
            if (err) return deferred.reject(new Error("Cannot save user with id: '%s'", userId));
            deferred.resolve({});
        });

        return deferred.promise;
    }

    function _getNextWordNumber(userId) {
        var deferred = Q.defer();

        var find = {userId: userId, 'word.number': {'$lt': max}};
        var update = {$inc: {'word.number': 1}};
        usersCollection.findOneAndUpdate(find, update, function (err, res) {
            if (err) return deferred.reject(new Error("Cannot get user with id: '%s'", userId));

            deferred.resolve(res.value);
        });

        return deferred.promise.then(function (user) {
            return !!user ? user.word.number : null;
        }, function (err) {
            errors("Error during getting the word. ", util.format(err), util.format(err.stack));
            throw new Error("Error during getting the word.");
        });
    }
}