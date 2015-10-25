import LoginController from './login.controller';

describe('Login Controller', () => {
    let controller;
    let UserAPI;
    let $state;
    let $timeout;
    let $q;
    let $rootScope;
    let logoutDefer;
    let checkLoggedInStatusDefer;

    beforeEach(() => {
        angular.mock.inject((_$q_, _$rootScope_) => {
            $q = _$q_;
            $rootScope = _$rootScope_;
            UserAPI = jasmine.createSpyObj('UserAPI', ['logout', 'checkLoggedInStatus']);
            $state = jasmine.createSpyObj('$state', ['go']);
            $state.params = {};
            $timeout = jasmine.createSpy('$timeout');
            logoutDefer = $q.defer();
            checkLoggedInStatusDefer = $q.defer();
            UserAPI.logout.and.returnValue(logoutDefer.promise);
            UserAPI.checkLoggedInStatus.and.returnValue(checkLoggedInStatusDefer.promise);
        });
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            controller = new LoginController(UserAPI, $state, $timeout);
            expect(controller.UserAPI).toBe(UserAPI);
            expect(controller.$state).toBe($state);
            expect(controller.$timeout).toBe($timeout);
            expect(controller.routeAfterLogin).toEqual('root.layout.dashboard');
        });

        describe('handle logout', () => {
            beforeEach(() => {
                $state.params.action = 'logout';
                controller = new LoginController(UserAPI, $state, $timeout);
            });

            it('should handle logout with logout parameter', () => {
                expect(controller.needCheckLogin).toBe(false);
                logoutDefer.resolve();
                $rootScope.$digest();
                expect(controller.loginError.type).toEqual('success');
                expect(controller.loginError.text).toEqual('You have been successfully logged out!');
            });

            it('should not show error if logout failed', () => {
                logoutDefer.reject();
                $rootScope.$digest();
                expect(controller.loginError).not.toBeDefined();
            });
        });

        describe('handle automatic login', () => {
            beforeEach(() => {
                controller = new LoginController(UserAPI, $state, $timeout);
            });

            it('should automatically log user in if user has already logged in', () => {
                expect(controller.userInfo).toBe(null);
                expect(controller.needCheckLogin).toBe(true);
                checkLoggedInStatusDefer.resolve('user info');
                $rootScope.$digest();
                expect(controller.userInfo).toEqual('user info');
                expect($timeout).toHaveBeenCalled();
                expect($timeout.calls.argsFor(0)[1]).toEqual(1000);
                const callback = $timeout.calls.argsFor(0)[0];
                callback();
                expect($state.go).toHaveBeenCalledWith('root.layout.dashboard');
            });

            it('should not log user in if checkLoggedInStatus rejects', () => {
                expect(controller.userInfo).toBe(null);
                expect(controller.needCheckLogin).toBe(true);
                checkLoggedInStatusDefer.reject();
                $rootScope.$digest();
                expect(controller.userInfo).toBe(null);
                expect(controller.needCheckLogin).toBe(false);
            });
        });
    });
});
