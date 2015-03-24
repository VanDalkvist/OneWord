// dependencies

var express = require('express');
var router = express.Router();

// exports

module.exports = router;

// initialization

router.get('/', function (req, res) {
    res.send({name: 'word', examples: []});
});

// private methods
