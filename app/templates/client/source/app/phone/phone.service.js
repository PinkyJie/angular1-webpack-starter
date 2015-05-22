(function () {
    'use strict';

    angular
        .module('app.phone')
        .factory('phoneAPI', phoneSerivce);

    phoneSerivce.$inject = ['$http', '$q'];
    /* @ngInject */
    function phoneSerivce ($http, $q) {
        var service = {
            getPhones: getPhones
        };

        return service;

        /////////////

        function getPhones () {
            var d = $q.defer();
            $http.get('api/phone')
                .success(success)
                .error(fail);
            return d.promise;

            function success (response, status) {
                if (status === 200 && response.code === 0) {
                    d.resolve(response.result.phones);
                } else {
                    d.reject(response.message);
                }
            }

            function fail () {
                d.reject('$SERVER');
            }

        }

    }
})();
