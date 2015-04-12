angular.module('one-word')
    .factory('WordProvider', Factory);

//Factory.$inject = ['Storage'];

function Factory() {
    var words = [], current, prev, next;
    var history = [];

    return {
        sync: _sync
    };

    function _sync() {
        return Storage.query(function (data) {
            words = data;

            return {
                current: _current,
                next: _next,
                previous: _previous
            };
        });
    }

    function _current() {
        return current;
    }

    function _next() {
        history.push(angular.copy(prev));
        prev = current;
        var toBeCurrent = angular.copy(next);
        Storage.get(function (res) {
            next = res;
        });
        return toBeCurrent;
    }

    function _previous() {
        next = angular.copy(current);
        current = angular.copy(prev);
        prev = history.pop();
        return current;
    }
}