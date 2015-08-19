// dependencies

var Q = require('q');
var _ = require('lodash');

// exports

module.exports = {};

// initialization

// private methods

Q.each = function (subject, prop) {
    if (!_.isObject(subject))
        throw new Error("Argument should be an object in the context.");

    var keys = _.keys(subject);

    return Q.spread(_.values(subject), function () {
        var args = arguments;
        if (_.isString(prop) || _.isFunction(prop)) {
            args = _.map(args, prop);
        }

        return _.zipObject(keys, args);
    });
};