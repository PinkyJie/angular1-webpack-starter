// Provide a unify handler to handle $http request failure
(function() {
    'use strict';

    angular
        .module('app.helper')
        .factory('ajaxErrorHanlder', ajaxErrorHanlderService);

    ajaxErrorHanlderService.$inject = ['ErrorMessage'];

    /* @ngInject */
    function ajaxErrorHanlderService(Error) {
        var service = {
            getMessage: getMessage
        };
        return service;

        function getMessage(reason) {
            return Error[reason] || Error['$SERVER'];
        }
    }
})();
