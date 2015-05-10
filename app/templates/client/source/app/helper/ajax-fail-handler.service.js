// Provide a unify handler to handle $http request failure
(function() {
    'use strict';

    angular
        .module('app.helper')
        .factory('ajaxFailHanlderService', ajaxFailHanlderService);

    ajaxFailHanlderService.$inject = ['logger'];

    /* @ngInject */
    function ajaxFailHanlderService(logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function(reason) {
                logger.error(message, reason);
            };
        }
    }
})();
