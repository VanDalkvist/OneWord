// dependencies

// exports

module.exports = [
    {
        name: 'grab words',
        period: '1 minute', // 'one day'
        action: _grabWords
    }
];

// initialization

// private methods

function _grabWords(instance) {
    var grabber = require('./grabber');
    console.log("start grabbing job...");
    return grabber.fetch(instance);
    // todo: save to database
}