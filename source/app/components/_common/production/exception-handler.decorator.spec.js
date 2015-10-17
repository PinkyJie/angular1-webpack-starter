import exceptionHandlerDecorator from './exception-handler.decorator';

describe('ExceptionHandler Decorator', () => {
    let Logger;
    let $timeout;

    // module defination, module load
    beforeEach(() => {
        angular.module('test', [])
            .config(($provide) => {
                $provide.decorator('$exceptionHandler', exceptionHandlerDecorator);
            });
        angular.mock.module('test');
    });

    // mock dependences
    beforeEach(() => {
        angular.mock.module(($provide) => {
            $provide.value('Logger', jasmine.createSpyObj('Logger', ['error']));
        });
    });

    // inject dependences
    beforeEach(() => {
        angular.mock.inject((_Logger_, _$timeout_) => {
            Logger = _Logger_;
            $timeout = _$timeout_;
        });
    });

    it('should call Logger.error when error happens', () => {
        const prefix = '[Aio Angular App Error]';
        // try to throw a error
        const error = new Error('exception');
        $timeout(() => {
            throw error;
        });
        $timeout.flush();
        expect(Logger.error).toHaveBeenCalledWith(`${prefix} exception`, {
            exception: error,
            cause: undefined // eslint-disable-line
        });
    });
});
