// dependencies

var Q = require('q');
var _ = require('lodash');

// exports

module.exports = _dailyWordsJob;

// initialization

// private methods

function _dailyWordsJob(instance, options) {
    var db = instance.get('db');
    var storage = instance.get('storage');
    var config = instance.get('config');

    var gcm = require('node-gcm');

    var sender = new gcm.Sender(config['google-api'].key);

    _loadUsers().then(function (users) {
        // todo: generate the message


        var message = new gcm.Message({
            data: {}
        });

        var messageModels = _(users).filter(function (user) {
            return !!user.regId;
        }).map(function (user) {
            return {
                regId: user.regId,
                message: storage.getWord(user.userId)
            };
        });

        //Q.all(messageModels);

        sender.send(message, messageModels, function (err, result) {
            if (err) console.error(err);
            else console.log(result);
        });
    });

    function _loadUsers() {
        var deferred = Q.defer();
        db.collection('users').find({}, function (err, res) {
            if (err) {
                console.log("Error during getting users: ", util.format(err.stack));
                return deferred.reject(err);
            }
            console.log("Users were successfully loaded.");
            deferred.resolve(res);
        });
    }
}