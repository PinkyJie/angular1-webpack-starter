import UserService from './user.service';

describe('User Service', () => {
    let $httpBackend;
    let $q;
    let $rootScope;
    let Event;
    let AjaxErrorHandler;
    let User;

    beforeEach(() => {
        angular.module('test', [])
            .service('User', UserService);
        angular.mock.module('test');
    });

    beforeEach(() => {
        angular.mock.module(($provide) => {
            $provide.value('Event', {
                AUTH_SESSION_VALID: 1,
                AUTH_LOGIN: 2,
                AUTH_LOGOUT: 3
            });
            $provide.value('AjaxErrorHandler', jasmine.createSpyObj('AjaxErrorHandler', ['catcher']));
        });
    });

    beforeEach(() => {
        angular.mock.inject((_$httpBackend_, _$q_, _$rootScope_, _Event_, _AjaxErrorHandler_, _User_) => {
            $httpBackend = _$httpBackend_;
            $q = _$q_;
            $rootScope = _$rootScope_;
            Event = _Event_;
            AjaxErrorHandler = _AjaxErrorHandler_;
            User = _User_;
            spyOn($q, 'reject').and.callThrough();
            spyOn($rootScope, '$broadcast');
        });
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            expect(User.Event).toBe(Event);
            expect(User.AjaxError).toBe(AjaxErrorHandler);
            expect(User.isLoggedIn()).toBe(false);
            expect(User.getUserInfo()).toBe(null);
        });
    });

    describe('checkLoggedInStatus function', () => {
        let apiResponse;
        beforeEach(() => {
            spyOn(User, '_setUser');
            spyOn(User, '_clearUser');
            apiResponse = $httpBackend.expectGET('api/user/loginstatus');
        });

        function successExpect (returnData) {
            return (data) => {
                expect(data).toEqual(returnData);
                expect(User._setUser).toHaveBeenCalledWith(returnData);
                expect($rootScope.$broadcast).toHaveBeenCalledWith(1, returnData);
            };
        }

        function errorExpect (error) {
            return () => {
                expect(User._setUser).not.toHaveBeenCalled();
                expect($rootScope.$broadcast).not.toHaveBeenCalled();
                expect($q.reject).toHaveBeenCalledWith(error);
                expect(User._clearUser).toHaveBeenCalled();
                expect(AjaxErrorHandler.catcher).toHaveBeenCalledWith(error);
            };
        }

        it('should set user when API returns successful result', () => {
            apiResponse.respond({code: 0, result: {user: 'user'}});
            User.checkLoggedInStatus().then(successExpect('user'));
            $httpBackend.flush();
        });

        it('should not set user when API returns error result', () => {
            apiResponse.respond({code: 1, message: 'error'});
            User.checkLoggedInStatus().catch(errorExpect('error'));
            $httpBackend.flush();
        });

        it('should not set user when API returns 500', () => {
            apiResponse.respond(() => {
                return [500];
            });
            User.checkLoggedInStatus().catch(errorExpect(null));
            $httpBackend.flush();
        });
    });

    describe('login function', () => {
        let apiResponse;
        beforeEach(() => {
            spyOn(User, '_setUser');
            spyOn(User, '_clearUser');
            apiResponse = $httpBackend.expectPOST('api/user/login');
        });

        function successExpect (returnData) {
            return (data) => {
                expect(data).toEqual(returnData);
                expect(User._setUser).toHaveBeenCalledWith(returnData);
                expect($rootScope.$broadcast).toHaveBeenCalledWith(2, returnData);
            };
        }

        function errorExpect (error) {
            return () => {
                expect(User._setUser).not.toHaveBeenCalled();
                expect($rootScope.$broadcast).not.toHaveBeenCalled();
                expect($q.reject).toHaveBeenCalledWith(error);
                expect(User._clearUser).toHaveBeenCalled();
                expect(AjaxErrorHandler.catcher).toHaveBeenCalledWith(error);
            };
        }

        it('should login user when API returns successful result', () => {
            apiResponse.respond({code: 0, result: {user: 'user'}});
            User.login('a', 'b').then(successExpect('user'));
            $httpBackend.flush();
        });

        it('should not login user when API returns error result', () => {
            apiResponse.respond({code: 1, message: 'error'});
            User.login('a', 'b').catch(errorExpect('error'));
            $httpBackend.flush();
        });

        it('should not login user when API returns 500', () => {
            apiResponse.respond(() => {
                return [500];
            });
            User.login('a', 'b').catch(errorExpect(null));
            $httpBackend.flush();
        });
    });

    describe('logout function', () => {
        let apiResponse;
        beforeEach(() => {
            spyOn(User, '_clearUser');
            apiResponse = $httpBackend.expectPOST('api/user/logout');
        });

        function successExpect () {
            expect(User._clearUser).toHaveBeenCalled();
            expect($rootScope.$broadcast).toHaveBeenCalledWith(3);
        }

        function errorExpect (error) {
            return () => {
                expect($rootScope.$broadcast).not.toHaveBeenCalled();
                expect($q.reject).toHaveBeenCalledWith(error);
                expect(User._clearUser).toHaveBeenCalled();
                expect(AjaxErrorHandler.catcher).toHaveBeenCalledWith(error);
            };
        }

        it('should logout user when API returns successful result', () => {
            apiResponse.respond({code: 0});
            User.logout().then(successExpect);
            $httpBackend.flush();
        });

        it('should still logout user even when API returns error result', () => {
            apiResponse.respond({code: 1, message: 'error'});
            User.logout().catch(errorExpect('error'));
            $httpBackend.flush();
        });

        it('should still logout user even when API returns 500', () => {
            apiResponse.respond(() => {
                return [500];
            });
            User.logout().catch(errorExpect(null));
            $httpBackend.flush();
        });
    });

    describe('getProductSummary function', () => {
        let apiResponse;
        beforeEach(() => {
            apiResponse = $httpBackend.expectGET('api/user/products');
        });

        function successExpect (returnData) {
            return (data) => {
                expect(data).toEqual(returnData);
            };
        }

        function errorExpect (error) {
            return () => {
                expect($q.reject).toHaveBeenCalledWith(error);
                expect(AjaxErrorHandler.catcher).toHaveBeenCalledWith(error);
            };
        }

        it('should get products info when API returns successful result', () => {
            apiResponse.respond({code: 0, result: {summary: 'summary'}});
            User.getProductSummary().then(successExpect('summary'));
            $httpBackend.flush();
        });

        it('should not get products info when API returns error result', () => {
            apiResponse.respond({code: 1, message: 'error'});
            User.getProductSummary().catch(errorExpect('error'));
            $httpBackend.flush();
        });

        it('should not get products info when API returns 500', () => {
            apiResponse.respond(() => {
                return [500];
            });
            User.getProductSummary().catch(errorExpect(null));
            $httpBackend.flush();
        });
    });

    describe('_setUser function', () => {
        it('should set user correctly', () => {
            User._setUser('test');
            expect(User.isLoggedIn()).toBe(true);
            expect(User.getUserInfo()).toBe('test');
        });
    });

    describe('_clearUser function', () => {
        it('should clear user correctly', () => {
            User._setUser('test');
            User._clearUser();
            expect(User.isLoggedIn()).toBe(false);
            expect(User.getUserInfo()).toBe(null);
        });
    });
});
