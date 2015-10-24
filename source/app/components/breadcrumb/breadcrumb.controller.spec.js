import BreadcrumbController from './breadcrumb.controller';

describe('Breadcrumb Controller', () => {
    let controller;
    let $rootScope;
    let $state;

    beforeEach(() => {
        $rootScope = jasmine.createSpyObj('$rootScope', ['$on']);
        $state = jasmine.createSpyObj('$state', ['current', 'params', 'get']);
        controller = new BreadcrumbController($state, $rootScope);
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            expect(controller.$state).toBe($state);
            expect(controller.$rootScope).toBe($rootScope);
            expect($rootScope.$on).toHaveBeenCalled();
            expect($rootScope.$on.calls.argsFor(0)[0]).toEqual('$stateChangeSuccess');
            const callback = $rootScope.$on.calls.argsFor(0)[1];
            spyOn(controller, '_applyNewBreadcrumb');
            callback({}, 'a', 'b');
            expect(controller._applyNewBreadcrumb).toHaveBeenCalledWith('a', 'b');
        });
    });

    describe('_applyNewBreadcrumb function', () => {
        let currentState;
        beforeEach(() => {
            currentState = {
                name: 'a.b.c.d'
            };
            $state.get.and.callFake((name) => {
                let config;
                switch (name) {
                    case 'a.b':
                        config = {
                            abstract: true
                        };
                        break;
                    case 'a.b.c':
                        config = {
                            breadcrumb: 'ccc'
                        };
                        break;
                    case 'a.b.c.d':
                        config = {
                            breadcrumb: 'ddd'
                        };
                        break;
                    default:
                        config = {};
                }
                return config;
            });
        });

        it('should generate correct breadcrumb list without params', () => {
            controller._applyNewBreadcrumb(currentState);
            const breadcrumbList = controller.breadcrumbs;
            expect(breadcrumbList[0]).toEqual({
                link: 'a.b.c',
                text: 'ccc'
            });
            expect(breadcrumbList[1]).toEqual({
                link: 'a.b.c.d',
                text: 'ddd'
            });
        });

        it('should generate correct breadcrumb list with params', () => {
            controller._applyNewBreadcrumb(currentState, {a: 1});
            const breadcrumbList = controller.breadcrumbs;
            expect(breadcrumbList[0]).toEqual({
                link: 'a.b.c',
                text: 'ccc'
            });
            expect(breadcrumbList[1]).toEqual({
                link: 'a.b.c.d({"a":1})',
                text: 'ddd'
            });
        });
    });

    describe('_getAncestorStates function', () => {
        it('should get the correct ancestor states', () => {
            expect(controller._getAncestorStates('a.b.c.d')).toEqual(['a.b', 'a.b.c', 'a.b.c.d']);
            expect(controller._getAncestorStates('a.b.c')).toEqual(['a.b', 'a.b.c']);
            expect(controller._getAncestorStates('a.b')).toEqual(['a.b']);
            expect(controller._getAncestorStates('a')).toEqual([]);
        });
    });
});
