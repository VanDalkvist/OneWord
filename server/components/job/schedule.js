// dependencies

var Agenda = require('agenda');
var util = require('util');

// app dependencies

var app = require('../../app');
var grabber = require('./grabber');

// initialization

_runScheduler();

// private methods

function _runScheduler() {
    app.bootstrap().then(_startScheduler, _connectionFailed);
}

function _startScheduler(instance) {
    var config = instance.get('config');

    console.log("current configuration: \n", util.format(config));

    var schedule = new Agenda({
        db: {
            address: config.mongo.address,
            collection: 'agenda.jobs'
        }
    });
    console.log("configuring grabbing job...");

    schedule.define('grab words', _grabWordsJob);

    //schedule.every('one day', 'grab words');
    schedule.every('30 seconds', 'grab words');

    schedule.start();
}

function _connectionFailed(err) {
    console.error(util.format(err.stack));
}

function _grabWordsJob(job, done) {
    console.log("start grabbing job...");
    grabber.fetch(instance).then(function (result) {
        console.log("finish grabbing job...");
        done();
        // todo: save to database
    }, function (err) {
        console.log("error occurs during grabbing job.", util.format(err));
        done(err);
    });
}