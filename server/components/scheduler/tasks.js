// dependencies

var Q = require('q');
var util = require('util');

// exports

module.exports = {
    'grab words': _processGrabbing,
    'daily words': _dailyWordsJob
};

// initialization

// private methods

function _processGrabbing(instance, options) {
    var grabber = require('./grabber');
    var db = instance.get('db');

    return _removeWords(db)
        .then(function () {
            return grabber.fetch(instance, options);
        })
        .then(function (result) {
            return _insertWords(db, result);
        });
}

function _removeWords(db) {
    var deferred = Q.defer();
    // todo: clear deprecated
    db.collection('words').remove({}, function (err, res) {
        if (err) {
            console.log("error during removing: ", util.format(err.stack));
            deferred.reject(err);
            return;
        }
        console.log("successfully removed.");
        deferred.resolve(res);
    });
    return deferred.promise;
}

function _insertWords(db, result) {
    var deferred = Q.defer();
    // todo: clear deprecated
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

function _dailyWordsJob(instance, options) {
    var db = instance.get('db');
    var config = instance.get('config');

    var gcm = require('node-gcm');

    var sender = new gcm.Sender(config['google-api'].key);

    // generate the message
    var message = new gcm.Message();
    message.addData('key1', 'msg1');

    // get reg ids
    var regIds = ['YOUR_REG_ID_HERE'];
    sender.send(message, regIds, function (err, result) {
        if (err) console.error(err);
        else console.log(result);
    });
}