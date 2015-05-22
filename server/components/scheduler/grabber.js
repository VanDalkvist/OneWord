'use strict';

// dependencies

var http = require('http');
var _ = require('lodash');
var Q = require('q');

// exports

module.exports.fetch = _fetch;

// private methods

/**
 * Returns many words
 * @param instance
 * @param options
 * @returns {*}
 */
function _fetch(instance, options) {

    // setting defaults
    options = options || {count: 5};
    var countWords = options.count;

    var config = instance.get('config');
    var api = config.api;

    var optionsBuilder = {
        dev: _getDevOptions,
        mock: _getDevOptions,
        prod: _getOptions
    };

    return Q.all(_.map(_.range(countWords), _buildWordPromise));

    function _buildWordPromise() {
        var deferred = Q.defer();

        var queryString = '/api/words/random';
        var random =
            http
                .get(_buildOptions(queryString), _getProduceRandomWordCallback(deferred))
                .on('error', _getErrCallback(deferred));

        return deferred.promise;
    }

    function _getProduceRandomWordCallback(deferred) {
        var queryString = '/api/words/random';
        return function _produceRandomWord(res) {
            _parseBody(res).then(function _getWordDefinitions(randomWord) {
                var word = randomWord.word; // todo: use in real api
                http
                    .get(_buildOptions(queryString), _getProcessFullWordCallback(deferred))
                    .on('error', _getErrCallback(deferred));
            });
        }
    }

    function _getProcessFullWordCallback(deferred) {
        return function _getFullWord(res) {
            _parseBody(res).then(function (word) {
                deferred.resolve(word);
            });
        }
    }

    function _getErrCallback(deferred) {
        return function _errCallback(err) {
            console.log('Error: ', err);
            deferred.reject(err);
        }
    }

    function _parseBody(res) {
        var deferred = Q.defer();
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            res.body = JSON.parse(body);
            deferred.resolve(res.body);
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