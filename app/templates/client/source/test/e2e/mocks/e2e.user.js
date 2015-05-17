// API mock for user.service.js
(function () {
    'use strict';

    angular
        .module('appTest')
        .run(UserServiceMock);

    UserServiceMock.$inject = ['MockData', '$httpBackend'];
    /* @ngInject */
    function UserServiceMock (MockData, $httpBackend) {
        $httpBackend.whenGET('api/user/loginstatus').respond(LoginStatusHandler);
        $httpBackend.whenPOST('api/user/login').respond(LoginHandler);
        $httpBackend.whenPOST('api/user/logout').respond(LogoutHandler);

        function LoginStatusHandler () {
            var code = MockData.loginstatus ? 0 : 1;
            var result = MockData.loginstatus ? {user: MockData.userInfo} : null;
            return [200, {code: code, message: null, result: result}];
        }

        function LoginHandler (method, url, data) {
            var req = JSON.parse(data);
            if (req.email === 'error@error.com') {
                return [200, {
                    code: 1,
                    message: 'LOGIN_WRONG_EMAIL_PASSWORD_PAIR',
                    result: null
                }];
            } else if (req.email === 'lock@lock.com') {
                return [200, {
                    code: 1,
                    message: 'LOGIN_USER_IN_LOCK',
                    result: null
                }];
            } else {
                MockData.loginStatus = true;
                return [200, {
                    code: 0, message: null,
                    result: {
                        user: MockData.userInfo
                    }
                }];
            }
        }

        function LogoutHandler () {
            MockData.loginStatus = false;
            return [200, {code: 0, message: null, result: null}];
        }
    }

})();
