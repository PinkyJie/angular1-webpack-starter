class AjaxErrorHandlerService {
    constructor (Error, $q) {
        this.Error = Error;
        this.$q = $q;
    }
    // directly reject the human readable error message
    catcher (reason) {
        // reason is:
        // 1. either an error $http response
        // 2. or an error message returned by _success
        const type = typeof reason;
        let message = '$SERVER';
        if (reason && type === 'object') {
            message = reason.message;
        } else if (reason && type === 'string') {
            message = reason;
        }
        return this.$q.reject(this.Error[message]);
    }
}

AjaxErrorHandlerService.$inject = ['Error', '$q'];

export default AjaxErrorHandlerService;
