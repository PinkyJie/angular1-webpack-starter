// API mock for user.service.js
(function () {
    'use strict';

    angular
        .module('appTest')
        .run(userServiceMock);

    userServiceMock.$inject = ['mockData', '$httpBackend'];
    /* @ngInject */
    function userServiceMock (mockData, $httpBackend) {
        $httpBackend.whenGET('api/user/loginstatus').respond(loginStatusHandler);
        $httpBackend.whenPOST('api/user/login').respond(loginHandler);
        $httpBackend.whenPOST('api/user/logout').respond(logoutHandler);
        $httpBackend.whenGET('api/user/products').respond(productsHandler);

        function loginStatusHandler () {
            var code = mockData.loginStatus ? 0 : 1;
            var result = mockData.loginStatus ? {user: mockData.userInfo} : null;
            return [200, {code: code, message: null, result: result}];
        }

        function loginHandler (method, url, data) {
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
                mockData.loginStatus = true;
                return [200, {
                    code: 0, message: null,
                    result: {
                        user: mockData.userInfo
                    }
                }];
            }
        }

        function logoutHandler () {
            mockData.loginStatus = false;
            return [200, {code: 0, message: null, result: null}];
        }

        function productsHandler () {
            return [200, {code: 0, message: null, result: {
                summary: mockData.userProducts
            }}];
        }
    }

})();
