// all error messages
const ERROR_MESSAGE = {
    // login
    LOGIN_WRONG_EMAIL_PASSWORD_PAIR: 'Incorrect email or password, please try again!',
    LOGIN_USER_IN_LOCK: 'Your account is locked!',
    // phone
    PHONE_QUERY_NOT_FOUND: 'Sorry, the phone you queryed can not be found!',
    PHONE_UPDATE_NOT_FOUND: 'Sorry, the phone you updated can not be found!',
    PHONE_DELETE_NOT_FOUND: 'Sorry, the phone you deleted can not be found!'
};

class ErrorService {
    static getError (errorCode) {
        return ErrorService.messageMap[errorCode] ? Error.messageMap[errorCode]
            : 'Server issue, please try later!';
    }
}
ErrorService.messageMap = ERROR_MESSAGE;

export default ErrorService;
