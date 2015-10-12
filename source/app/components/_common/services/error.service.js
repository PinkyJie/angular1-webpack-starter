// all error messages
const ERROR_MESSAGE = {
    // unexpected
    $UNEXPECTED: 'Server issue, please try later!',
    // login
    LOGIN_WRONG_EMAIL_PASSWORD_PAIR: 'Incorrect email or password, please try again!',
    LOGIN_USER_IN_LOCK: 'Your account is locked!',
    // phone
    PHONE_QUERY_NOT_FOUND: 'Sorry, the phone you queryed can not be found!',
    PHONE_UPDATE_NOT_FOUND: 'Sorry, the phone you updated can not be found!',
    PHONE_DELETE_NOT_FOUND: 'Sorry, the phone you deleted can not be found!'
};

class ErrorService {
    getErrorMessage (errorCode) {
        return ERROR_MESSAGE[errorCode] || ERROR_MESSAGE.$UNEXPECTED;
    }
}

export default ErrorService;
