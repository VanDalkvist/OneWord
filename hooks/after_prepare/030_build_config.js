var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];

if (rootdir) {
    // go through each of the platform directories that have been prepared
    var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);

    platforms.forEach(function (platform) {
        try {
            platform = platform.trim().toLowerCase();

            var configFilePath = _getConfigPath(platform);

            if (!fs.existsSync(configFilePath)) {
                throw new Error("Cannot find '" + configFilePath + "'");
            }

            var content = fs.readFileSync(configFilePath, 'utf8');
            content.replace(/\{\{senderId\}\}/g, '');
            fs.writeFileSync(configFilePath, content, 'utf-8');

        } catch (e) {
            process.stdout.write(e);
        }
    });

    function _getConfigPath(platform) {
        var configFilePath;
        if (platform == 'android') {
            configFilePath = path.join('platforms', platform, 'assets', 'www', 'js', 'common', 'config.js');
        } else {
            configFilePath = path.join('platforms', platform, 'www', 'js', 'common', 'config.js');
        }
        return configFilePath;
    }
}
