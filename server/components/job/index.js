// dependencies

var child = require('child_process');

// exports

module.exports.start = _start;

// initialization

// private methods

function _start(path) {
    child.exec('node ' + path, function (err, stdout, stderr) {
        if (err) {
            console.log(err.stack);
            console.log('Error code: ' + err.code);
            console.log('Signal received: ' + err.signal);
        }
        stdout && console.log('stdout: ' + stdout);
        stderr && console.log('stderr: ' + stderr);
    });
}