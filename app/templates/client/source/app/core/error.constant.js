// all error messages
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('ErrorMessage', {
            '$SERVER': 'Server issue, please try later!',
            'LOGIN_WRONG_EMAIL_PASSWORD_PAIR': 'Incorrect email or password, please try again!',
            'LOGIN_USER_IN_LOCK': 'Your account is locked!'
        });

})();
