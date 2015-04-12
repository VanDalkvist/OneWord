angular.module('one-word').service('Storage', Storage);

Storage.$inject = ['$q', 'Word'];

function Storage($q, Word) {

    var entities = [];

    var WordMock = {
        get: function () {
            return {
                $promise: $q.when({
                    name: 'testWord',
                    definition: 'This is test definition of testWord',
                    examples: [
                        {content: 'This is example 1'},
                        {content: 'This is example 2'}
                    ]
                })
            };
        },
        all: function () {
            return entities;
        },
        add: function (entity) {
            entities.push(entity);
        }
    };

    //return WordMock;

    return Word;
}