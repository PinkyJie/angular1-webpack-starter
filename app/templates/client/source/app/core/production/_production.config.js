(function () {
    'use strict';

    angular
        .module('app.core')
        .config(appProductionConfig);

    var config = {
        appErrorPrefix: '[<%= appDesc %> Error] ',
    };

    appProductionConfig.$inject = ['$logProvider', '$compileProvider',
        'exceptionHandlerProvider'];
    /* @ngInject */
    function appProductionConfig ($logProvider, $compileProvider, exceptionHandlerProvider) {
        $logProvider.debugEnabled(false);
        $compileProvider.debugInfoEnabled(false);
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }

})();
