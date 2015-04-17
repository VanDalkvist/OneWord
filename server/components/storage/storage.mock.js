// dependencies

var Q = require('q');
var _ = require('lodash');
var logger = require('debug')('app:words-mock');
var errors = require('debug')('app:words-mock:error');

// exports

module.exports = Storage;

// initialization

var max = 10;

// private methods

function Storage() {
    var wordsCollection = _buildWordsCollection();
    var usersCollection = _buildUsersCollection();

    this.next = _next;
    this.getUser = _getUser;
    this.saveUser = _saveUser;

    function _next(userId) {
        var number;

        return _getNextWordNumber(userId).then(function (wordNumber) {
            number = wordNumber;
            return Q.when(_.find(wordsCollection, {number: wordNumber}));
        }).then(function (word) {
            var next = ++number;
            var user = _.find(usersCollection, {id: userId});
            user.word.number = (next < max ? next : null);

            return word;
        });
    }

    function _getUser(userId) {
        return _.find(usersCollection, {id: userId});
    }

    function _getNextWordNumber(userId) {
        return Q.when(_.find(usersCollection, {id: userId})).then(function (user) {
            return user.word.number || 0;
        });
    }

    function _buildUsersCollection() {
        return [
            {
                id: 1,
                name: 'Bob',
                word: {
                    number: 0
                }
            },
            {
                id: 2,
                name: 'Han',
                word: {
                    number: null
                }
            },
            {
                id: 3,
                name: 'Dingo',
                word: {
                    number: undefined
                }
            },
            {
                id: 4,
                name: 'Hank',
                word: {
                    number: 9
                }
            }
        ];
    }

    function _buildWordsCollection() {
        return [
            {
                name: 'word',
                definition: 'it\'s a definition',
                number: 0,
                examples: [
                    'it\'s an example 1',
                    'it\'s an example 2',
                    'it\'s an example 3'
                ]
            }, {
                name: 'hello',
                definition: 'it\'s a definition of hello',
                number: 1,
                examples: [
                    'it\'s an example 1',
                    'it\'s an example 2',
                    'it\'s an example 3'
                ]
            }, {
                name: 'critical',
                definition: 'it\'s a definition of critical',
                number: 2,
                examples: [
                    'it\'s an example 1',
                    'it\'s an example 2',
                    'it\'s an example 3'
                ]
            }, {
                name: 'apple',
                definition: 'it\'s a definition of apple',
                number: 3,
                examples: [
                    'it\'s an example 1',
                    'it\'s an example 2',
                    'it\'s an example 3'
                ]
            }, {
                name: 'magic',
                definition: 'it\'s a definition of magic',
                number: 4,
                examples: [
                    'it\'s an example 1',
                    'it\'s an example 2',
                    'it\'s an example 3'
                ]
            }, {
                name: 'man',
                definition: 'it\'s a definition of man',
                number: 5,
                examples: [
                    'it\'s an example 1',
                    'it\'s an example 2',
                    'it\'s an example 3'
                ]
            }, {
                name: 'grunt',
                definition: 'it\'s a definition of grunt',
                number: 6,
                examples: [
                    'it\'s an example 1',
                    'it\'s an example 2',
                    'it\'s an example 3'
                ]
            }, {
                name: 'baby',
                definition: 'it\'s a definition of baby',
                number: 7,
                examples: [
                    'it\'s an example 1',
                    'it\'s an example 2',
                    'it\'s an example 3'
                ]
            }, {
                name: 'blog',
                definition: 'it\'s a definition of blog',
                number: 8,
                examples: [
                    'it\'s an example 1',
                    'it\'s an example 2',
                    'it\'s an example 3'
                ]
            }, {
                name: 'woman',
                definition: 'it\'s a definition of woman',
                number: 9,
                examples: [
                    'it\'s an example 1',
                    'it\'s an example 2',
                    'it\'s an example 3'
                ]
            }
        ];
    }
}