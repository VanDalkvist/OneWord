module.exports = {
    "api": {
        "uri": process.env.WORDSAPI_URI || process.env.API_URI,
        "key": process.env.WORDSAPI_KEY || process.env.API_KEY
    },
    "mongo": {
        "uri": process.env.MONGOLAB_URI || process.env.MONGOHQ_URL
                || process.env.OPENSHIFT_MONGODB_DB_URL
                || 'mongodb://localhost/one-word'
    },
    "port": process.env.PORT || 3000,
    "debug": {
        "mock": true
    },
    "env": process.env.NODE_ENV || process.env.ENV || "dev"
};