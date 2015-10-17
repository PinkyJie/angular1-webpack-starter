import LoggerService from './logger.service';

// for service, we can directly unit test the class without Angular
describe('Logger Service', () => {
    let $log;
    let logger;
    const message = 'message';
    const data = 'data';

    beforeEach(() => {
        $log = jasmine.createSpyObj('$log', ['error', 'info', 'debug', 'warn']);
        logger = new LoggerService($log);
    });

    describe('constructor function', () => {
        it('should set passed parameters correctly by constructor', () => {
            expect(logger.$log).toBe($log);
        });
    });

    function expectCommon (func, prefix) {
        expect($log[func]).toHaveBeenCalledWith(`${prefix}: ${message}, ${data}`);
    }

    describe('error function', () => {
        it('should call $log.error with correct parameters', () => {
            logger.error(message, data);
            expectCommon('error', 'Error');
        });
    });

    describe('info function', () => {
        it('should call $log.info with correct parameters', () => {
            logger.info(message, data);
            expectCommon('info', 'Info');
        });
    });

    describe('debug function', () => {
        it('should call $log.debug with correct parameters', () => {
            logger.debug(message, data);
            expectCommon('debug', 'Debug');
        });
    });

    describe('warning function', () => {
        it('should call $log.warning with correct parameters', () => {
            logger.warning(message, data);
            expectCommon('warn', 'Warning');
        });
    });
});
