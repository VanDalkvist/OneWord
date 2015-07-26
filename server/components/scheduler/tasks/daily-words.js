// dependencies

var Q = require('q');
var _ = require('lodash');

// exports

module.exports = _dailyWordsJob;

// initialization

// private methods

/**
 * If it is 'NotRegistered' - you should remove the registration ID from your server database
 * because the application was uninstalled from the device, or the client app isn't configured to receive messages.
 * @param instance
 * @param options
 * @returns {*}
 * @private
 */
function _dailyWordsJob(instance, options) {
    var db = instance.get('db');
    var storage = instance.get('storage');
    var config = instance.get('config');

    var gcm = require('node-gcm');

    return _loadUsers()
        .then(function (users) {
            var filteredUsers = _.filter(users, function (user) {
                return !!user.regId;
            });
            console.log("Filtering and mapping users...");
            return Q.all(filteredUsers.map(function (user) {
                return Q.each({regId: user.regId, word: storage.getWord(user.userId)});
            }));
        }).then(function (wordsConfig) {
            var filtered = _.filter(wordsConfig, function (item) {
                return !!item.word;
            });
            return Q.all(_sendMessages(_.groupBy(filtered, 'word.name')));
        }
    );

    function _loadUsers() {
        var deferred = Q.defer();
        console.log("Loading users...");
        db.collection('users').find({}).toArray(function (err, res) {
            if (err) {
                console.log("Error during getting users: ", util.format(err.stack));
                return deferred.reject(err);
            }
            console.log("Users were successfully loaded.");
            deferred.resolve(res);
        });
        return deferred.promise;
    }

    function _buildSender() {
        var apiKey = config['google-api'].key;
        return new gcm.Sender(apiKey);
    }

    function _sendMessages(wordsByName) {
        var sender = _buildSender();

        return _.map(_groupIdsByWordName(wordsByName), function (ids, wordName) {
            var gcmMessage = new gcm.Message({
                data: wordsByName[wordName].word
            });
            console.log("Sending message for '" + wordName + "' word.");
            var deferred = Q.defer();
            sender.send(gcmMessage, ids, function (err, result) {
                if (err) {
                    console.error(err);
                    return deferred.reject(err);
                }
                console.log("Result for ", result);
                deferred.resolve(result);
            });
            return deferred.promise;
        });
    }

    function _groupIdsByWordName(wordsHash) {
        console.log("Grouping registering ids by word name...");
        var groupedIdsByWord = {};
        _.each(wordsHash, function (grouped, wordName) {
            groupedIdsByWord[wordName] = _.pluck(grouped, 'regId');
        });
        return groupedIdsByWord;
    }
}