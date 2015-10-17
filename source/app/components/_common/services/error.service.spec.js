import ErrorService from './error.service';

// for service, we can directly unit test the class without Angular
describe('Error Service', () => {
    let error;

    beforeEach(() => {
        error = new ErrorService();
    });

    describe('getErrorMessage function', () => {
        it('should get correct error message with a known error', () => {
            const errorCode = 'LOGIN_USER_IN_LOCK';
            const errorText = 'Your account is locked!';
            expect(error.getErrorMessage(errorCode)).toEqual(errorText);
        });

        it('should get correct error message with unknown error', () => {
            const errorCode = 'aaaa';
            const errorText = 'Server issue, please try later!';
            expect(error.getErrorMessage(errorCode)).toEqual(errorText);
        });
    });
});
