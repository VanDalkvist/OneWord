// test require dependencies

var should = require('should');
var Q = require('q');
var supertest = require('supertest');

// app dependencies

var runnner = require('../bin/runner');

// tests

describe('words', function () {

    var request, app;

    before(function () {
        return Q.when(runnner).then(function (resolver) {
            should.exist(resolver);

            app = resolver.get('app');
            should.exist(app);

            request = supertest(app);
        });
    });

    it('it should work', function (done) {
        request.get('/api/words/random')
            .end(function (err, res) {
                should.equal(err, null);
                should.equal(res.status, 200);
                should.exist(res.body);
                should.exist(res.body.name);
                should.exist(res.body.examples);
                should.exist(res.body.definition);
                done();
            });
    });
});