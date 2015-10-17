import AjaxErrorHandlerService from './ajax-error-handler.service';

// for service, we can directly unit test the class without Angular
describe('AjaxErrorHandler Service', () => {
    let ErrorService;
    let $q;
    let ajaxErrorHandler;

    beforeEach(() => {
        ErrorService = jasmine.createSpyObj('Error', ['getErrorMessage']);
        $q = jasmine.createSpyObj('$q', ['reject']);
        ajaxErrorHandler = new AjaxErrorHandlerService(ErrorService, $q);
    });

    describe('constructor function', () => {
        it('should set passed parameters correctly by constructor', () => {
            expect(ajaxErrorHandler.Error).toBe(ErrorService);
            expect(ajaxErrorHandler.$q).toBe($q);
        });
    });

    describe('catcher function', () => {
        function expectCommon (input, errorCode) {
            ajaxErrorHandler.catcher(input);
            expect(ErrorService.getErrorMessage).toHaveBeenCalledWith(errorCode);
            expect($q.reject).toHaveBeenCalledWith({
                code: errorCode,
                text: ErrorService.getErrorMessage(errorCode)
            });
        }

        it('should get correct code/message with string input', () => {
            const input = 'test';
            expectCommon(input, input);
        });

        it('should get correct code/message with object input', () => {
            const input = {
                message: 'test'
            };
            expectCommon(input, input.message);
        });

        it('should get correct code/message with null input', () => {
            const defaultString = '$UNEXPECTED';
            expectCommon(null, defaultString);
        });

        it('should get correct code/message with number input', () => {
            const defaultString = '$UNEXPECTED';
            expectCommon(123, defaultString);
        });
    });
});
