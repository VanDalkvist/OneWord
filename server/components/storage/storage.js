// dependencies

var Q = require('q');
var util = require('util');
var _ = require('lodash');

// app dependencies

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
    this.updateUser = _updateUser;

    function _getWord(userId) {
        return _getNextWordNumber(userId).then(function (wordNumber) {
            // todo: rewrite to NotFound error
            if (!_.isNumber(wordNumber) && _.isEmpty(wordNumber)) return null;

            return _findWord(wordNumber);
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

    function _createUser(userId, regId) {
        var deferred = Q.defer();

        var userModel = {userId: userId, word: {number: 0}, regId: regId};
        usersCollection.insertOne(userModel, function (err, res) {
            if (err) return deferred.reject(new Error("Cannot save user with id: '%s'", userId));
            deferred.resolve({userId: userId});
        });

        return deferred.promise;
    }

    function _updateUser(userId, regId) {
        var deferred = Q.defer();

        var filterModel = {userId: userId};
        var updateModel = {$set: {regId: regId}};
        usersCollection.updateOne(filterModel, updateModel, function (err, res) {
            if (err) return deferred.reject(new Error("Cannot save user with id: '%s'", userId));
            deferred.resolve(filterModel);
        });

        return deferred.promise;
    }

    function _getNextWordNumber(userId) {
        return _findUserAndUpdateNumber(userId).then(function (user) {
            return !!user ? user.word.number : null;
        }, function (err) {
            errors("Error during getting the word. ", util.format(err), util.format(err.stack));
            throw new Error("Error during getting the word.");
        });
    }

    /**
     * todo: add reset option
     * @param userId
     * @returns {*|promise}
     * @private
     */
    function _findUserAndUpdateNumber(userId) {
        var deferred = Q.defer();

        var find = {userId: userId, 'word.number': {'$lt': max}};
        var update = {$inc: {'word.number': 1}};
        usersCollection.findOneAndUpdate(find, update, function (err, res) {
            if (err) return deferred.reject(new Error("Cannot get user with id: '%s'", userId));

            deferred.resolve(res.value);
        });

        return deferred.promise;
    }

    function _findWord(number) {
        var deferred = Q.defer();

        wordsCollection.findOne({number: number}, function (err, res) {
            if (err) return deferred.reject(err);

            deferred.resolve(_prepareWord(res));
        });

        return deferred.promise;
    }

    function _prepareWord(word) {
        if (!word) return word;

        delete word._id;
        delete word.number;
        return word;
    }
}