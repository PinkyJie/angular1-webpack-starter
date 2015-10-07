const config = {
    appErrorPrefix: '[Aio Angular App Error] '
};

appProductionConfig.$inject = ['$logProvider', '$compileProvider',
    'exceptionHandlerProvider'];
function appProductionConfig ($logProvider, $compileProvider, exceptionHandlerProvider) {
    $logProvider.debugEnabled(false);
    $compileProvider.debugInfoEnabled(false);
    exceptionHandlerProvider.configure(config.appErrorPrefix);
}

export default appProductionConfig;
