import SidebarController from './sidebar.controller';

describe('Sidebar Controller', () => {
    let controller;
    let $rootScope;
    let $scope;
    let RouterHelper;

    beforeEach(() => {
        $rootScope = {};
        $scope = jasmine.createSpyObj('$scope', ['$on']);
        RouterHelper = jasmine.createSpyObj('RouterHelper', ['getStates']);
        RouterHelper.getStates.and.returnValue([
            {
                sidebar: {
                    text: 'sidebar1'
                },
                name: 'name1'
            },
            {
                name: 'name2'
            }
        ]);
        controller = new SidebarController(RouterHelper, $scope, $rootScope);
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            expect(controller.RouterHelper).toBe(RouterHelper);
            expect(controller.$scope).toBe($scope);
            expect(controller.$rootScope).toBe($rootScope);
            expect(controller.navs.length).toEqual(1);
            expect(controller.navs[0].text).toEqual('sidebar1');
            expect(controller.navs[0].link).toEqual('name1');
            expect($rootScope.hasSidebar).toBe(true);
            expect($scope.$on).toHaveBeenCalled();
            expect($scope.$on.calls.argsFor(0)[0]).toEqual('$destroy');
            const callback = $scope.$on.calls.argsFor(0)[1];
            callback();
            expect($rootScope.hasSidebar).toBe(false);
        });
    });

    describe('hideSidebar function', () => {
        it('should set hideSidebar on $rootScope', () => {
            controller.hideSidebar();
            expect($rootScope.showSidebar).toBe(false);
        });
    });
});
