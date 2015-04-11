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

    return grabber.fetch(instance, options).then(function (result) {
        _insertWords(instance.get('db'), result);
    });
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