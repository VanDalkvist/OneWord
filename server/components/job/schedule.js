// dependencies

// app dependencies

var app = require('../../app');

// exports

//module.exports = {};

// initialization

app.boostrap().then(_job);

// private methods

function _job(instance) {
    var config = instance.get('config');

    var api = config.api;

    var postData = querystring.stringify({
        'msg': 'Hello World!'
    });

    var options = {
        hostname: 'www.google.com',
        port: 80,
        path: '/upload',
        method: 'POST',
        headers: {
            // todo: set api headers
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    var req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        //res.setEncoding('utf8');
        res.on('data', {encoding: 'utf8'}, function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write(postData);
    req.end();
}