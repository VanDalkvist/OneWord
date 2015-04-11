// dependencies

var Q = require('q');
var util = require('util');

// exports

module.exports = {
    'grab words': _grabWords
};

// initialization

// private methods

function _grabWords(instance, options) {
    var grabber = require('./grabber');
    console.log("start grabbing job...");

    var db = instance.get('db');

    var deferred = Q.defer();
    db.collection('words').remove({}, function (err, res) {
        if (err) {
            console.log("error during removing: ", util.format(err.stack));
            deferred.reject(err);
            return;
        }
        console.log("successfully inserted.");
        return grabber.fetch(instance, options).then(function (result) {
            return _insertWords(db, result);
        }).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
    });
    return deferred.promise;
}

function _insertWords(db, result) {
    var deferred = Q.defer();
    db.collection('words').insert(result, function (err, res) {
        if (err) {
            console.log("error during saving: ", util.format(err.stack));
            deferred.reject(err);
            return;
        }
        console.log("successfully inserted.");
        deferred.resolve(res);
    });
    return deferred.promise;
}