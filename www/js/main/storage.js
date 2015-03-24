angular.module('one-word').service('Storage', Storage);

Storage.$inject = ['Word'];

function Storage(Word) {
    return Word;
}