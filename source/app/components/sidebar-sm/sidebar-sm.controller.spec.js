import SidebarSmController from './sidebar-sm.controller';

describe('SidebarSm Controller', () => {
    let controller;
    let $rootScope;

    beforeEach(() => {
        $rootScope = {};
        controller = new SidebarSmController($rootScope);
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            expect(controller.$rootScope).toBe($rootScope);
        });
    });

    describe('toggleSidebar function', () => {
        it('should set showSidebar to $rootScope', () => {
            controller.toggleSidebar();
            expect($rootScope.showSidebar).toBe(true);
            controller.toggleSidebar(true);
            expect($rootScope.showSidebar).toBe(true);
        });
    });
});
