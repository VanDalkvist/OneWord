(function (module) {

    module.factory('WordProvider', Factory);

    Factory.$inject = ['Word'];

    function Factory(Word) {
        var words = [], current, prev, next;
        var history = [];

        return {
            sync: _sync
        };

        function _sync() {
            return Word.query(function (data) {
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
            Word.get(function (res) {
                next = res;
            });
            return toBeCurrent;
        }

        function _previous() {
            next = angular.copy(current);
            current = angular.copy(prev);
            prev = history.pop();
            //var toBeCurrent = angular.copy(prev);
            //Word.get(function (res) {
            //    next = res;
            //});
            return current;
        }
    }

    module.factory('Word', Resource);

    Resource.$inject = ['$resource'];

    function Resource($resource) {
        return $resource("api/words/:action", {}, {
            random: {method: 'GET', params: {action: 'random'}}
        });
    }
})(angular.module('one-word.words', ['ngResource']));
