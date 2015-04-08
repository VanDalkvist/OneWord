'use strict';

// dependencies

var https = require('https');
var _ = require('lodash');

// Backwards-compat with node 0.10.x
var EventEmitter = require('events').EventEmitter;

// app dependencies

var app = require('../../app');

// initialization

var emitter = new EventEmitter();

emitter.on('random', function (stream) {

});
app.boostrap().then(_job);

// private methods

function _job(instance) {
    var config = instance.get('config');

    var api = config.api;

    var random = https.get(_buildOptions('?random=true'));

    random.once('response', function (response) {
        console.log("Got response: " + response.statusCode);
        console.log('Got headers: ' + JSON.stringify(response.headers));

        // todo: http://dailyjs.com/2012/11/19/streams-part-2/
        response.on('readable', function () {
            var data = '', chunk;
            while ((chunk = response.read()) != null) {
                data += chunk;
            }
            var parsed = JSON.parse(data);
            var word = parsed.word;

            https.get(_buildOptions('words/' + word));
        });

        //response.pipe();

        //response.on('data', {encoding: 'utf8'}, function (chunk) {
        //    // todo: parse response
        //    console.log('Got body: ' + chunk);
        //});
    }).on('error', function (err) {
        console.log("Got error: " + err.message);
    });

    function _buildOptions(queryString) {
        var authHeaders = {'X-Mashape-Key': api.key};

        return _requestOptions({headers: authHeaders}, queryString);
    }

    function _requestOptions(options, queryString) {
        return _.extend({}, {hostname: api.uri, path: queryString}, options);
    }
}