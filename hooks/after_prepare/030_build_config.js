#!/usr/bin/env node

// Add Platform Class
// v1.0
// Automatically adds the platform class to the body tag
// after the `prepare` command. By placing the platform CSS classes
// directly in the HTML built for the platform, it speeds up
// rendering the correct layout/style for the specific platform
// instead of waiting for the JS to figure out the correct classes.

var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];

if (rootdir) {
    // go through each of the platform directories that have been prepared
    var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);

    platforms.forEach(_setSenderId);

    function _setSenderId(platform) {
        try {
            var configFilePath = _getConfigPath(platform);

            if (!fs.existsSync(configFilePath)) {
                throw new Error("Cannot find '" + configFilePath + "'");
            }

            var senderId = process.env.SENDER_ID;
            var content = fs.readFileSync(configFilePath, 'utf8');
            var senderIdRegExp = /{{senderId}}/g;
            content = content.replace(senderIdRegExp, senderId);
            fs.writeFileSync(configFilePath, content, 'utf-8');

        } catch (e) {
            process.stdout.write(e);
        }
    }

    function _getConfigPath(platform) {
        platform = platform.trim().toLowerCase();
        var configFilePath;
        if (platform == 'android') {
            configFilePath = path.join('platforms', platform, 'assets', 'www', 'js', 'common', 'config.js');
        } else {
            configFilePath = path.join('platforms', platform, 'www', 'js', 'common', 'config.js');
        }
        return configFilePath;
    }
}
