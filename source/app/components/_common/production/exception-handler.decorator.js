// Extend the original $exceptionHandler service.
// * add error log prefix using exceptionPrefixProvider
// * do other thing with error log
exceptionHandlerDecorator.$inject = ['$delegate', 'Logger'];
function exceptionHandlerDecorator ($delegate, logger) {
    return (exception, cause) => { // eslint-disable-line
        const appErrorPrefix = '[Aio Angular App Error] ';
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

export default exceptionHandlerDecorator;
