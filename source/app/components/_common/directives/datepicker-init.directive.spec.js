import DatepickerInitDirective from './datepicker-init.directive';

describe('DatepickerInit Directive', () => {
    let scope;
    let element;
    let $compile;

    beforeEach(() => {
        angular.module('test', [])
            .directive('aioDatepickerInit', DatepickerInitDirective);
        angular.mock.module('test');
    });

    beforeEach(() => {
        angular.mock.inject(($rootScope, _$compile_) => {
            scope = $rootScope.$new();
            $compile = _$compile_;
        });
    });

    describe('Pass a valid date as ng-model', () => {
        beforeEach(() => {
            // 2015-10-1
            scope.date = new Date(2015, 9, 1);
            // special method to test jquery plugin function
            spyOn($.fn, 'pickadate').and.callThrough();
            element = $compile('<input ng-model="date" aio-datepicker-init />')(scope);
            scope.$digest();
        });

        it('should call pickadate twice when initializing with valid date', () => {
            expect($.fn.pickadate).toHaveBeenCalledWith({format: 'yyyy-m-d'});
            // this is in watch function
            expect($.fn.pickadate).toHaveBeenCalledWith('picker');
            expect($.fn.pickadate.calls.count()).toEqual(2);
        });

        it('should not call pickadate any more even if model changes', () => {
            // change model but watch function will not be called again
            scope.date = new Date(2016, 10, 1);
            scope.$digest();
            expect($.fn.pickadate.calls.count()).toEqual(2);
        });

        it('should display the model in correct format', () => {
            expect(element.val()).toEqual('2015-10-1');
        });
    });

    describe('Pass a null/undefined value as ng-model', () => {
        beforeEach(() => {
            scope.date = null;
            // special method to test jquery plugin function
            spyOn($.fn, 'pickadate').and.callThrough();
            element = $compile('<input ng-model="date" aio-datepicker-init />')(scope);
            scope.$digest();
        });

        it('should only call pickadate once when initializing with null', () => {
            expect($.fn.pickadate.calls.count()).toEqual(1);
        });

        it('should display nothing', () => {
            expect(element.val()).toEqual('');
        });
    });
});
