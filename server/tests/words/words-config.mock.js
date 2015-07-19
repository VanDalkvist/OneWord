module.exports = [
    {
        /**
         * regular expression of URL
         */
        pattern: process.env.WORDSAPI_URI || process.env.API_URI,

        /**
         * returns the data
         *
         * @param match array Result of the resolution of the regular expression
         * @param params object sent by 'send' function
         */
        fixtures: function (match, params) {
            /**
             * example:
             *   request.get('https://error.example/404').end(function(err, res){
             *     console.log(err); // 404
             *   })
             */
            if (match[1] === '404') {
                throw new Error(404);
            }

            /**
             * example:
             *   request.get('https://error.example/200').end(function(err, res){
             *     console.log(res.body); // "Data fixtures"
             *   })
             */

            /**
             * example:
             *   request.get('https://domain.send.example/').send({superhero: "me"}).end(function(err, res){
             *     console.log(res.body); // "Data fixtures - superhero:me"
             *   })
             */
            if (params["superhero"]) {
                return 'Data fixtures - superhero:' + params["superhero"];
            } else {
                return 'Data fixtures';
            }
        },

        /**
         * returns the result of the request
         *
         * @param match array Result of the resolution of the regular expression
         * @param data  mixed Data returns by `fixtures` attribute
         */
        callback: function (match, data) {
            return {
                body: data
            };
        }
    }
];