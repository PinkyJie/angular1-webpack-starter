// Provide a unify handler to handle $http request failure
(function () {
    'use strict';

    angular
        .module('app.helper')
        .factory('ajaxErrorHandler', ajaxErrorHandlerService);

    ajaxErrorHandlerService.$inject = ['ErrorMessage'];

    /* @ngInject */
    function ajaxErrorHandlerService (Error) {
        var service = {
            getMessage: getMessage
        };
        return service;

        function getMessage (reason) {
            return Error[reason] || Error['$SERVER'];
        }
    }
})();
