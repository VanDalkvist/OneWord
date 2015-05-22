// dependencies

var childProcess = require('child_process');

// exports

var commands = [
    {text: 'npm i --msvs-version=2013', name: 'app dev dependencies'},
    {text: 'bower i', name: 'app client dependencies'},
    {text: 'npm i -g gulp --msvs-version=2013', name: 'gulp'},
    {text: 'cd server && npm i --msvs-version=2013 && cd ../', name: 'server node dependencies'},
    {text: 'npm i -g ionic && ionic state restore --plugins', name: 'ionic'}
];

commands.forEach(_start);

// initialization

// private methods

function _start(command) {
    var child = childProcess.exec(command.text);
    child.on('error', function (data) {
        console.error('command: ' + command.name + ' - error: ', data);
    });
    child.stdout.on('data', function (data) {
        console.log('command: ' + command.name + ' - stdout: ', data);
    });
    child.stderr.on('data', function (data) {
        console.error('command: ' + command.name + ' - stderr: ', data);
    });
    child.on('close', function (code) {
        console.log('command: ' + command.name + ' - closing code: ', code);
    });
}