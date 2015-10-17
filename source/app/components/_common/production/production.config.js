import extendExceptionHandler from './exception-handler.decorator';

appProductionConfig.$inject = ['$logProvider', '$compileProvider'];
function appProductionConfig ($logProvider, $compileProvider) {
    $logProvider.debugEnabled(false);
    $compileProvider.debugInfoEnabled(false);
}

exceptionHandlerConfig.$inject = ['$provide'];
function exceptionHandlerConfig ($provide) {
    // Use decorator to extend the original $exceptionHandler:
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
}

export {appProductionConfig, exceptionHandlerConfig};
