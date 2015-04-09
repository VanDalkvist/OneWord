'use strict';

// dependencies

var https = require('https');
var _ = require('lodash');
var Q = require('q');

// exports

module.exports.fetch = _fetch;

// private methods

function _fetch(instance) {
    var config = instance.get('config');
    var db = instance.get('db');

    var api = config.api;

    var optionsBuilder = {
        dev: _getDevOptions,
        mock: _getDevOptions,
        prod: _getOptions
    };

    var deferred = Q.defer();

    var queryString = '/api/words/random';
    var random =
        https
            .get(_buildOptions(queryString), _produceRandomWord)
            .on('error', _errCallback);

    return deferred.promise;

    function _produceRandomWord(res) {
        _parseBody(res).then(_getWordDefinitions);
    }

    function _getWordDefinitions(randomWord) {
        var word = randomWord.word; // todo: use in real api
        https
            .get(_buildOptions(queryString), _getFullWord)
            .on('error', _errCallback);
    }

    function _getFullWord(res) {
        _parseBody(res).then(function (word) {
            deferred.resolve(word);
        });
    }

    function _errCallback(err) {
        console.log('Error: ', err);
        deferred.reject(err);
    }

    function _parseBody(res) {
        var deferred = Q.defer();
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            res.body = JSON.parse(body);
            deferred.resolve(body);
        });
        res.on('error', function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
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