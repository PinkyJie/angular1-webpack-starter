import TooltipInitDirective from './tooltip-init.directive';

describe('TooltipInit Directive', () => {
    let scope;

    beforeEach(() => {
        angular.module('test', [])
            .directive('aioTooltipInit', TooltipInitDirective);
        angular.mock.module('test');
    });

    beforeEach(() => {
        angular.mock.inject(($rootScope, $compile) => {
            scope = $rootScope.$new();
            spyOn($.fn, 'tooltip').and.callThrough();
            $compile('<button aio-tooltip-init></button>')(scope);
            scope.$digest();
        });
    });

    it('should call tooltip function when initialization', () => {
        expect($.fn.tooltip).toHaveBeenCalled();
    });

    it('should remove tooltip when destory', () => {
        expect($.fn.tooltip.calls.count()).toEqual(1);
        scope.$destroy();
        expect($.fn.tooltip).toHaveBeenCalledWith('remove');
    });
});
