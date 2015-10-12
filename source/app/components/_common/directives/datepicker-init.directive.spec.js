import angular from 'angular';
import 'angular-mocks';
const mock = angular.mock;

import DatepickerInitDirective from './datepicker-init.directive';

describe('DatePickerInit Directive', () => {
    let scope;
    let element;
    let $compile;

    beforeEach(() => {
        angular.module('test', [])
            .directive('aioDatepickerInit', DatepickerInitDirective);
    });

    beforeEach(() => {
        mock.module('test');
    });

    beforeEach(() => {
        mock.inject(($rootScope, _$compile_) => {
            scope = $rootScope.$new();
            $compile = _$compile_;
        });
    });

    it('should make element get focus when attribute is true', () => {
        scope.isFocus = true;
        element = $compile('<input aio-focus-me="{{isFocus}}" />')(scope);
        spyOn(element[0], 'focus');
        scope.$digest();
        expect(element[0].focus).toHaveBeenCalled();
    });

    it('should make element lose focus when attribute is false', () => {
        scope.isFocus = false;
        element = $compile('<input aio-focus-me="{{isFocus}}" />')(scope);
        spyOn(element[0], 'focus');
        scope.$digest();
        expect(element[0].focus).not.toHaveBeenCalled();
    });
});
