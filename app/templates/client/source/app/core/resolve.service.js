(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('resolve', resolve);

    resolve.$inject = ['user', '$q'];
    /* @ngInject */
    function resolve (user, $q) {
        return {
            login: login
        };

        ///////////

        function login () {
            var d = $q.defer();
            user.checkLoggedInStatus()
                .then(success)
                .catch(error);

            return d.promise;

            function success () {
                d.resolve();
            }

            function error () {
                d.reject('requireLogin');
            }
        }
    }
})();
