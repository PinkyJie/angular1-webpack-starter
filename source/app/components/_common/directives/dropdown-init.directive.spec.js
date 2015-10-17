import DropdownInitDirective from './dropdown-init.directive';

describe('DropdownInit Directive', () => {
    let scope;

    beforeEach(() => {
        angular.module('test', [])
            .directive('aioDropdownInit', DropdownInitDirective);
        angular.mock.module('test');
    });

    beforeEach(() => {
        angular.mock.inject(($rootScope, $compile) => {
            scope = $rootScope.$new();
            spyOn($.fn, 'dropdown').and.callThrough();
            $compile('<a aio-dropdown-init></a>')(scope);
            scope.$digest();
        });
    });

    it('should call dropdown function when initialization', () => {
        expect($.fn.dropdown).toHaveBeenCalled();
    });
});
