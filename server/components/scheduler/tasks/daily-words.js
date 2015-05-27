// dependencies

// exports

module.exports = _dailyWordsJob;

// initialization

// private methods

function _dailyWordsJob(instance, options) {
    var db = instance.get('db');
    var config = instance.get('config');

    var gcm = require('node-gcm');

    var sender = new gcm.Sender(config['google-api']);

    // todo: generate the message
    var message = new gcm.Message({
        data: {}
    });

    // todo: get reg ids
    var regIds = [''];
    sender.send(message, regIds, function (err, result) {
        if (err) console.error(err);
        else console.log(result);
    });
}