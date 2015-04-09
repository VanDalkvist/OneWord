// dependencies

var Agenda = require('agenda');

// app dependencies

var app = require('../../app');
var grabber = require('./grabber');

// initialization

_runScheduler();

// private methods

function _runScheduler() {
    app.boostrap().then(function (instance) {
        var config = instance.get('config');
        var schedule = new Agenda({db: {
            address: config.address,
            collection: 'agenda.jobs'
        }});

        schedule.every('one minute', 'grab words');
        //schedule.every('one day', 'grab words');

        schedule.define('grab words', function(job, done) {
            console.log("start grabbing job...");
            grabber.fetch(instance).then(function (result) {
                console.log("start grabbing job...");
                // todo: save to database
            });
        });
    });
}