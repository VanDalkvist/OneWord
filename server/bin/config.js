module.exports = _buildConfig();

function _buildConfig() {
    return {
        "api": {
            "uri": process.env.WORDSAPI_URI || process.env.API_URI,
            "key": process.env.WORDSAPI_KEY || process.env.API_KEY
        },
        "mongo": {
            "uri": process.env.MONGOLAB_URI || process.env.MONGOHQ_URL
            || process.env.OPENSHIFT_MONGODB_DB_URL
            || 'mongodb://localhost:27017/one-word',
            "address": 'localhost:27017/one-word'
        },
        "port": (process.env.ENV === 'test') ? 3001 : (process.env.PORT || 3000),
        "debug": {
            "mock": process.env.MOCK || false
        },
        "isDebug": _isDebug.bind(this),
        "env": process.env.NODE_ENV || process.env.ENV || 'dev'
    };

    function _isDebug() {
        var config = this;
        return config.env === 'test' || config.env === 'dev' || config.env === 'mock';
    }
}