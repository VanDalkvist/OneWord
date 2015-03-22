module.exports = _init();

function _init() {
    var cordovaPlugins = [];

    cordovaPlugins.push("org.apache.cordova.device");
    cordovaPlugins.push("org.apache.cordova.console");
    cordovaPlugins.push("com.ionic.keyboard");

    return cordovaPlugins;
}