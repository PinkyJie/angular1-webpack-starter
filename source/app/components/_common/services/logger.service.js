// A wrapper service for original $log
class LoggerService {
    constructor ($log) {
        this.$log = $log;
    }

    error (message, data) {
        this.$log.error(`Error: ${message}, ${data}`);
    }

    info (message, data) {
        this.$log.info(`Info: ${message}, ${data}`);
    }

    success (message, data) {
        this.$log.info(`Success: ${message}, ${data}`);
    }

    warning (message, data) {
        this.$log.warn(`Warning: ${message}, ${data}`);
    }
}

LoggerService.$inject = ['$log'];

export default LoggerService;
