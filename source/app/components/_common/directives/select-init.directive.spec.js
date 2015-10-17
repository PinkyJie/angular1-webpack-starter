import SelectInitDirective from './select-init.directive';

describe('SelectInit Directive', () => {
    let scope;

    beforeEach(() => {
        angular.module('test', [])
            .directive('aioSelectInit', SelectInitDirective);
        angular.mock.module('test');
    });

    beforeEach(() => {
        angular.mock.inject(($rootScope, $compile) => {
            scope = $rootScope.$new();
            spyOn($.fn, 'material_select').and.callThrough();
            scope.fakeArr = ['a', 'b', 'c'];
            $compile('<select aio-select-init ng-model="fakeArr"></select>')(scope);
            scope.$digest();
        });
    });

    it('should call select function when initialization', () => {
        expect($.fn.material_select).toHaveBeenCalled();
    });

    it('should call select when model changes', () => {
        scope.fakeArr = ['a'];
        scope.$digest();
        expect($.fn.material_select.calls.count()).toEqual(2);
    });
});
