class AjaxErrorHandlerService {
    constructor (Error, $q) {
        Object.assign(this, {Error, $q});
    }
    // directly reject with the human readable error message
    catcher (reason) {
        // reason is:
        // 1. either an error $http response
        // 2. or an error message returned by _success
        const type = typeof reason;
        let code = '$UNEXPECTED';
        if (reason) {
            if (type === 'object') {
                code = reason.message;
            } else if (type === 'string') {
                code = reason;
            }
        }
        return this.$q.reject({
            code,
            text: this.Error.getErrorMessage(code)
        });
    }
}

AjaxErrorHandlerService.$inject = ['Error', '$q'];

export default AjaxErrorHandlerService;
