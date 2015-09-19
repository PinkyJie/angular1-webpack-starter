// Configure log prefix for error handling
class ExceptionHandlerProvider {
    constructor () {
        this.config = {
            appErrorPrefix: ''
        };
    }

    configure (appErrorPrefix) {
        this.config.appErrorPrefix = appErrorPrefix;
    }

    $get () {
        return {config: this.config};
    }
}

// Extend the original $exceptionHandler service.
// * add error log prefix using exceptionHandlerProvider
// * do other thing with error log
extendExceptionHandler.$inject = ['$delegate', 'ExceptionHandler', 'Logger'];
function extendExceptionHandler ($delegate, exceptionHandler, logger) {
    return (exception, cause) => {
        const appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
        const errorData = {exception, cause};
        exception.message = appErrorPrefix + exception.message;
        // $delegate(exception, cause);
        /**
         * Could add the error to a service's collection,
         * add errors to $rootScope, log errors to remote web server,
         * or log locally. Or throw hard. It is entirely up to you.
         * throw exception;
         *
         * @example
         *     throw { message: 'error message we added' };
         */
        logger.error(exception.message, errorData);
    };
}

exceptionHandlerConfig.$inject = ['$provide'];
// Use decorator to extend the original $exceptionHandler:
function exceptionHandlerConfig ($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
}

export {ExceptionHandlerProvider, exceptionHandlerConfig};
