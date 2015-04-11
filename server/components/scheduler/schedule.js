// dependencies

var Agenda = require('agenda');
var util = require('util');
var _ = require('lodash');

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

    var taskDescriptions = require('./tasks.config.json');
    var tasks = require('./tasks');

    _.forEach(taskDescriptions, function (task, name) {
        schedule.define(name, function job(job, done) {
            console.log("job '" + name + "' was started");
            var taskResult = tasks[name](instance, task.options);
            _processTask(taskResult, done);
        });

        schedule.every(task.period, name);
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