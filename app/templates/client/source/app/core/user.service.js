(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('User', UserSerivce);

    UserSerivce.$inject = ['$http', '$q', 'logger'];
    /* @ngInject */
    function UserSerivce($http, $q, logger) {
        var service = {

        };

        return service;

    }
})();
