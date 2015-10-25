import LoginFormController from './login-form.controller';

describe('LoginForm Controller', () => {
    let controller;
    let UserAPI;
    let $state;
    let $q;
    let $rootScope;

    beforeEach(() => {
        angular.mock.inject((_$q_, _$rootScope_) => {
            $q = _$q_;
            $rootScope = _$rootScope_;
            UserAPI = jasmine.createSpyObj('UserAPI', ['login']);
            $state = jasmine.createSpyObj('$state', ['go']);
            controller = new LoginFormController(UserAPI, $state);
        });
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            expect(controller.UserAPI).toBe(UserAPI);
            expect(controller.$state).toBe($state);
        });
    });

    describe('login function', () => {
        let deferred;
        let credential;

        beforeEach(() => {
            credential = {
                email: 'email',
                password: 'password'
            };
            deferred = $q.defer();
            UserAPI.login.and.returnValue(deferred.promise);
            controller.loginForm = {};
        });

        it('should directly return when form is invalid', () => {
            controller.loginForm.$invalid = true;
            controller.login(credential);
            expect(UserAPI.login).not.toHaveBeenCalled();
        });

        describe('success callback', () => {
            beforeEach(() => {
                deferred.resolve();
                controller.login(credential);
            });

            it('should go to previous page after login', () => {
                $state.prev = {
                    state: 'state',
                    params: 'params'
                };
                $rootScope.$digest();
                expect($state.go).toHaveBeenCalledWith('state', 'params');
                expect($state.prev).toBe(null);
            });

            it('should go to normal page after login', () => {
                $state.prev = null;
                controller.routeAfterLogin = 'routeAfterLogin';
                $rootScope.$digest();
                expect($state.go).toHaveBeenCalledWith('routeAfterLogin');
            });
        });

        it('should call error function with invalid credential', () => {
            controller.loginForm.$invalid = false;
            spyOn(controller, '_setError');
            deferred.reject({text: 'text'});
            controller.login(credential);
            $rootScope.$digest();
            expect(controller._setError).toHaveBeenCalledWith('error', 'text');
            expect(controller.isRequest).toBe(false);
        });
    });

    describe('_setError function', () => {
        it('should set passed in parameters to controller', () => {
            controller._setError('type', 'text');
            expect(controller.loginError.type).toEqual('type');
            expect(controller.loginError.text).toEqual('text');
        });
    });
});
