import DashboardController from './dashboard.controller';

describe('Dashboard Controller', () => {
    let controller;
    let UserAPI;
    let $q;
    let $rootScope;
    let deferred;

    beforeEach(() => {
        angular.mock.inject((_$q_, _$rootScope_) => {
            $q = _$q_;
            $rootScope = _$rootScope_;
            UserAPI = jasmine.createSpyObj('UserAPI', ['getUserInfo', 'getProductSummary']);
            UserAPI.getUserInfo.and.returnValue({
                name: 'name'
            });
            deferred = $q.defer();
            UserAPI.getProductSummary.and.returnValue(deferred.promise);
            controller = new DashboardController(UserAPI);
        });
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            expect(controller.UserAPI).toBe(UserAPI);
            expect(controller.colors).toEqual(['indigo', 'red', 'pink']);
            expect(controller.welcomeMessage).toEqual('Welcome name!');
        });
    });

    describe('_getProductsSummary function', () => {
        it('should get product data when API is resolved', () => {
            deferred.resolve([
                {
                    name: 'name1'
                },
                {
                    name: 'name2'
                },
                {
                    name: 'name3'
                }
            ]);
            controller._getProductsSummary();
            $rootScope.$digest();
            expect(controller.products.length).toEqual(3);
            expect(controller.products[0].name).toEqual('name1');
            expect(controller.products[0].link).toEqual('root.layout.name1');
            expect(controller.products[1].name).toEqual('name2');
            expect(controller.products[1].link).toEqual('root.layout.name2');
            expect(controller.products[2].name).toEqual('name3');
            expect(controller.products[2].link).toEqual('root.layout.name3');
        });

        it('should not get product data when API is rejected', () => {
            deferred.reject();
            controller._getProductsSummary();
            $rootScope.$digest();
            expect(controller.products).not.toBeDefined();
        });
    });
});
