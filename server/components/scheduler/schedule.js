// dependencies

var Agenda = require('agenda');
var util = require('util');

// app dependencies

var app = require('../../app');

// initialization

app.bootstrap().then(_startScheduler, _connectionFailed);

// private methods

function _startScheduler(instance) {
    var config = instance.get('config');

    console.log("current configuration: \n", util.format(config));

    var schedule = new Agenda({
        db: {
            address: config.mongo.address,
            collection: 'jobs'
        }
    });
    console.log("configuring jobs...");

    _configureJobs.call(schedule, instance);

    schedule.start();
}

function _configureJobs(instance) {
    var schedule = this;

    var tasks = require('./tasks');

    tasks.forEach(function (task) {
        schedule.define(task.name, function job(job, done) {
            console.log("job '" + task.name + "' was started");
            var taskResult = task.action(instance);
            _processTask(taskResult, done);
        });

        schedule.every(task.period, task.name);
    });
}

function _processTask(taskResult, done) {
    taskResult.then(function (result) {
        console.log("job was finished");
        done();
    }, function (err) {
        console.log("error occurs during job.", util.format(err));
        done(err);
    });
}

function _connectionFailed(err) {
    console.error(util.format(err.stack));
}