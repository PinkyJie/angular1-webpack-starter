import HeaderController from './header.controller';

describe('Header Controller', () => {
    let controller;
    let $rootScope;
    let EVENT;

    beforeEach(() => {
        $rootScope = jasmine.createSpyObj('$rootScope', ['$on']);
        EVENT = {
            AUTH_LOGIN: 1,
            AUTH_LOGOUT: 2,
            AUTH_SESSION_VALID: 3
        };
        controller = new HeaderController($rootScope, EVENT);
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            expect(controller.$rootScope).toBe($rootScope);
            expect(controller.Event).toBe(EVENT);
            expect($rootScope.$on.calls.count()).toEqual(3);
            expect($rootScope.$on.calls.argsFor(0)[0]).toEqual(1);
            expect($rootScope.$on.calls.argsFor(1)[0]).toEqual(2);
            expect($rootScope.$on.calls.argsFor(2)[0]).toEqual(3);
        });
    });

    describe('updateHeader function', () => {
        it('should set correct status with valid user info', () => {
            controller.updateHeader({}, 'user');
            expect(controller.isLoggedIn).toBe(true);
            expect(controller.userInfo).toEqual('user');
        });

        it('should set correct status with invalid user info', () => {
            controller.updateHeader({});
            expect(controller.isLoggedIn).toBe(false);
            expect(controller.userInfo).toEqual(null);
        });
    });

    describe('switchSidebar function', () => {
        it('should switch sidebar show/hide', () => {
            $rootScope.showSidebar = true;
            controller.switchSidebar();
            expect($rootScope.showSidebar).toBe(false);
            controller.switchSidebar();
            expect($rootScope.showSidebar).toBe(true);
        });
    });
});
