// test require dependencies

var should = require('should');
var Q = require('q');
var http = require('http');
var _ = require('lodash');
var request = require('request');

// app dependencies

var runner = require('../../bin');

// tests

describe('streams experiments', function () {

    var instance, config, api;
    before(function () {
        return runner.then(function (appInstance) {
            instance = appInstance;
            should.exist(instance);

            config = instance.get('config');
            should.exist(config);

            should.exist(config.api);
            api = config.api;
        });
    });

    it('it should work', function (done) {
        var options = _buildOptions('/api/words/random');
        console.log("Request options: ", options);

        var random = http.get(options, function (res) {
            _parseBody(res, function () {
                _onLoaded(res);

                var word = res.body.word;
                http.get(options, function (res) {
                    _parseBody(res, function () {
                        _onLoaded(res);

                        done();
                    });
                }).on('error', _errCallback);
            });
        }).on('error', _errCallback);

        function _errCallback(err) {
            console.log('Error: ', err);
            should.exist(err);
        }

        function _onLoaded(response) {
            console.log('Got body: ', response.body);

            should.equal(response.statusCode, 200);
            should.exist(response);
            should.exist(response.body);
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
            //var authHeaders = {'X-Mashape-Key': api.key};

            return _requestOptions({headers: {'content-type': 'application/json'}}, queryString);
        }

        function _requestOptions(options, queryString) {
            return _.extend({}, {hostname: 'localhost', port: config.port, path: queryString}, options);
        }
    });
});