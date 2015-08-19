// test require dependencies

var should = require('should');
var Q = require('q');
var supertest = require('supertest');

// app dependencies

var runner = require('../../bin/');

// tests

describe('words', function () {

    var request, app, instance;

    before(function () {
        return Q.when(runner).then(function (resolver) {
            should.exist(resolver);

            instance = resolver;
            app = resolver.get('app');
            should.exist(app);

            request = supertest(app);
        });
    });

    it('it should generate ', function (done) {

        var tasksConfig = require('../../components/scheduler/tasks.config.json');

        var taskConfig = tasksConfig['daily words'];

        var dailyWords = require('../../components/scheduler/tasks/daily-words');

        var request = require('superagent');
        var mockConfig = require('./words-config.mock');
        require('superagent-mock')(request, mockConfig);

        dailyWords(instance, taskConfig).then(function (res) {
            done();
        }, function (err) {
            throw err;
        });

        //request.get('/api/words/random')
        //    .end(function (err, res) {
        //        should.equal(err, null);
        //        should.equal(res.status, 200);
        //        should.exist(res.body);
        //        should.exist(res.body.name);
        //        should.exist(res.body.examples);
        //        should.exist(res.body.definition);
        //        done();
        //    });
    });
});