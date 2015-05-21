(function () {
    'use strict';

    angular
        .module('app.core')
        .config(appConfig);

    var config = {
        appErrorPrefix: '[AIO Angular Error] ',
        appTitle: 'AIO Angular'
    };

    appConfig.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
    /* @ngInject */
    function appConfig ($logProvider, routerHelperProvider, exceptionHandlerProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({mainTitle: config.appTitle});
    }

})();
