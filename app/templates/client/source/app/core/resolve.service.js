(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('resolve', resolve);

    resolve.$inject = ['userAPI', '$q'];
    /* @ngInject */
    function resolve (userAPI, $q) {
        return {
            login: login
        };

        ///////////

        function login () {
            var d = $q.defer();
            userAPI.checkLoggedInStatus()
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
