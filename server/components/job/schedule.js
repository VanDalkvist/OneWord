// dependencies

var Agenda = require('agenda');
var debug = require('debug');
var scheduleLogger = debug('scheduleLogger');

// app dependencies

var app = require('../../app');
var grabber = require('./grabber');

// initialization

_runScheduler();

// private methods

function _runScheduler() {
    app.bootstrap().then(function (instance) {
        var config = instance.get('config');
        var schedule = new Agenda({db: {
            address: config.address,
            collection: 'agenda.jobs'
        }});
        scheduleLogger("configuring grabbing job...");

        schedule.every('one minute', 'grab words');
        //schedule.every('one day', 'grab words');

        schedule.define('grab words', function(job, done) {
            scheduleLogger("start grabbing job...");
            grabber.fetch(instance).then(function (result) {
                scheduleLogger("start grabbing job...");
                // todo: save to database
            });
        });
    });
}