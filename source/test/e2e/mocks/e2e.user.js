// API mock for user.service.js
userServiceMock.$inject = ['MockData', '$httpBackend'];
function userServiceMock (MockData, $httpBackend) {
    $httpBackend.whenGET('api/user/loginstatus').respond(loginStatusHandler);
    $httpBackend.whenPOST('api/user/login').respond(loginHandler);
    $httpBackend.whenPOST('api/user/logout').respond(logoutHandler);
    $httpBackend.whenGET('api/user/products').respond(productsHandler);

    function loginStatusHandler () {
        const code = MockData.loginStatus ? 0 : 1;
        const result = MockData.loginStatus ? {user: MockData.userInfo} : null;
        return [200, {code, message: null, result}];
    }

    function loginHandler (method, url, data) {
        const req = JSON.parse(data);
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
        }
        MockData.loginStatus = true;
        return [200, {
            code: 0, message: null,
            result: {
                user: MockData.userInfo
            }
        }];
    }

    function logoutHandler () {
        MockData.loginStatus = false;
        return [200, {code: 0, message: null, result: null}];
    }

    function productsHandler () {
        return [200, {code: 0, message: null, result: {
            summary: MockData.userProducts
        }}];
    }
}

export default userServiceMock;
