// dependencies

// exports

module.exports.init = _init;

// initialization

// private methods

function _init() {

    /**
     *
     * @constructor
     */
    function StorageStrategy(storage) {

        var Storage = storage;

        this.get = function _get(word) {
            return Storage.get(word);
        };

        this.random = function _random() {
            //var all = Storage.all();

            return Storage.random();
        };
    }
}