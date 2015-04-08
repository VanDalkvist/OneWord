// dependencies

var https = require('https');

// Backwards-compat with node 0.10.x
var EventEmitter = require('events').EventEmitter;

// app dependencies

var app = require('../../app');

// exports

//module.exports = {};

// initialization

var emitter = new EventEmitter();

emitter.on('random', function (stream) {

});
app.boostrap().then(_job);

// private methods

function _job(instance) {
    var config = instance.get('config');

    var api = config.api;

    var options = {
        hostname: api.uri,
        path: '?random=true',
        headers: {
            'X-Mashape-Key': api.key
        }
    };

    var random = https.get(options);

    random.once('response', function (response) {
        console.log("Got response: " + response.statusCode);
        console.log('Got headers: ' + JSON.stringify(response.headers));

        // todo: http://dailyjs.com/2012/11/19/streams-part-2/
        response.on('readable', function () {
            var data, chunk;
            while ((chunk = response.read()) != null) {
                data += chunk;
            }
        });

        //response.pipe();

        //response.on('data', {encoding: 'utf8'}, function (chunk) {
        //    // todo: parse response
        //    console.log('Got body: ' + chunk);
        //});
    }).on('error', function (err) {
        console.log("Got error: " + err.message);
    });
}