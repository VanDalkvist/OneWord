'use strict';

// dependencies

var https = require('https');
var _ = require('lodash');

// app dependencies

var app = require('../../app');

// initialization

app.boostrap().then(_job);

// private methods

function _job(instance) {
    var config = instance.get('config');

    var api = config.api;

    var optionsBuilder = {
        dev: _getDevOptions,
        mock: _getDevOptions,
        prod: _getOptions
    };

    var queryString = '/api/words/random';
    var random = https.get(_buildOptions(queryString), function (res) {
        _parseBody(res, function () {
            var word = res.body.word; // todo: use in real api
            https.get(_buildOptions(queryString), function (res) {
                _parseBody(res, function () {
                    done();
                });
            }).on('error', _errCallback);
        });
    }).on('error', _errCallback);

    function _errCallback(err) {
        console.log('Error: ', err);
    }

    function _parseBody(res, callback) {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            res.body = JSON.parse(body);
            callback();
        });
    }

    function _buildOptions(queryString) {
        return optionsBuilder[config.env](queryString);
    }

    function _getDevOptions(queryString) {
        return {
            hostname: 'localhost',
            port: config.port,
            path: queryString,
            headers: {
                'content-type': 'application/json'
            }
        };
    }

    function _getOptions(queryString) {
        return {
            hostname: api.uri,
            path: queryString,
            headers: {
                'content-type': 'application/json',
                'X-Mashape-Key': api.key
            }
        };
    }
}