(function () {
    'use strict';

    angular
        .module('app.phone')
        .factory('phoneAPI', phoneSerivce);

    phoneSerivce.$inject = ['$http', '$q'];
    /* @ngInject */
    function phoneSerivce ($http, $q) {
        var service = {
            getPhones: getPhones,
            getPhoneDetail: getPhoneDetail,
            addNewPhone: addNewPhone,
            updatePhone: updatePhone,
            removePhone: removePhone
        };

        return service;

        /////////////

        function getPhones () {
            var d = $q.defer();
            $http.get('api/phones')
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

        function getPhoneDetail (id) {
            var d = $q.defer();
            $http.get('api/phones/' + id)
                .success(success)
                .error(fail);
            return d.promise;

            function success (response, status) {
                if (status === 200 && response.code === 0) {
                    d.resolve(response.result.phone);
                } else {
                    d.reject(response.message);
                }
            }

            function fail () {
                d.reject('$SERVER');
            }
        }

        function addNewPhone (phone) {
            var d = $q.defer();
            var req = {
                'phone': phone
            };
            $http.post('api/phones', req)
                .success(success)
                .error(fail);
            return d.promise;

            function success (response, status) {
                if (status === 200 && response.code === 0) {
                    d.resolve(response.result.phone);
                } else {
                    d.reject(response.message);
                }
            }

            function fail () {
                d.reject('$SERVER');
            }
        }

        function updatePhone (id, phone) {
            var d = $q.defer();
            var req = {
                'phone': phone
            };
            $http.put('api/phones/' + id, req)
                .success(success)
                .error(fail);
            return d.promise;

            function success (response, status) {
                if (status === 200 && response.code === 0) {
                    d.resolve(response.result.phone);
                } else {
                    d.reject(response.message);
                }
            }

            function fail () {
                d.reject('$SERVER');
            }
        }

        function removePhone (id) {
            var d = $q.defer();
            $http.delete('api/phones/' + id)
                .success(success)
                .error(fail);
            return d.promise;

            function success (response, status) {
                if (status === 200 && response.code === 0) {
                    d.resolve(response.result.phone);
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
