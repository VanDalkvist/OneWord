// dependencies

var Q = require('q');
var _ = require('lodash');
var logger = require('debug')('app:words-mock');
var errors = require('debug')('app:words-mock:error');

// exports

module.exports = Words;

// initialization

// private methods

function Words() {
    var wordsCollection = _buildWordsCollection();
    var usersCollection = _buildUsersCollection();

    this.next = _next;

    function _next(userId) {
        var number;

        return _getNextWordNumber(userId).then(function (wordNumber) {
            number = wordNumber;
            return Q.nfcall(_.find, wordsCollection, {number: wordNumber});
        }).then(function (word) {
            var next = ++number;
            var user = _.find(usersCollection, {userId: userId});
            user.word.number = (next < max ? next : null);

            return word;
        });
    }

    function _getNextWordNumber(userId) {
        return Q.nfcall(_.find, usersCollection, {id: userId}).then(function (user) {
            return user.word.number;
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
                definition: 'it is definition',
                number: 0,
                examples: [
                    'it is example 1',
                    'it is example 2',
                    'it is example 3'
                ]
            }, {
                name: 'hello',
                definition: 'it is definition of hello',
                number: 1,
                examples: [
                    'it is example 1',
                    'it is example 2',
                    'it is example 3'
                ]
            }, {
                name: 'critical',
                definition: 'it is definition of critical',
                number: 2,
                examples: [
                    'it is example 1',
                    'it is example 2',
                    'it is example 3'
                ]
            }, {
                name: 'apple',
                definition: 'it is definition of apple',
                number: 3,
                examples: [
                    'it is example 1',
                    'it is example 2',
                    'it is example 3'
                ]
            }, {
                name: 'magic',
                definition: 'it is definition of magic',
                number: 4,
                examples: [
                    'it is example 1',
                    'it is example 2',
                    'it is example 3'
                ]
            }, {
                name: 'man',
                definition: 'it is definition of man',
                number: 5,
                examples: [
                    'it is example 1',
                    'it is example 2',
                    'it is example 3'
                ]
            }, {
                name: 'grunt',
                definition: 'it is definition of grunt',
                number: 6,
                examples: [
                    'it is example 1',
                    'it is example 2',
                    'it is example 3'
                ]
            }, {
                name: 'baby',
                definition: 'it is definition of baby',
                number: 7,
                examples: [
                    'it is example 1',
                    'it is example 2',
                    'it is example 3'
                ]
            }, {
                name: 'blog',
                definition: 'it is definition of blog',
                number: 8,
                examples: [
                    'it is example 1',
                    'it is example 2',
                    'it is example 3'
                ]
            }, {
                name: 'woman',
                definition: 'it is definition of woman',
                number: 9,
                examples: [
                    'it is example 1',
                    'it is example 2',
                    'it is example 3'
                ]
            }
        ];
    }
}