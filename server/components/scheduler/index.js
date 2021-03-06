// dependencies

var childProcess = require('child_process');
var debug = require('debug');
var scheduleLogger = debug('app:schedule');
var scheduleErrors = debug('app:schedule:errors');

// exports

module.exports.start = _start;

// initialization

// private methods

function _start(path) {
    var child = childProcess.exec('node ' + path); // debug option ' --debug-brk=53000' todo: set debug from config
    child.on('error', function (data) {
        scheduleErrors('error: ' + data);
    });
    child.stdout.on('data', function (data) {
        scheduleLogger('stdout: ' + data);
    });
    child.stderr.on('data', function (data) {
        scheduleErrors('stderr: ' + data);
    });
    child.on('close', function (code) {
        scheduleLogger('closing code: ' + code);
    });
}