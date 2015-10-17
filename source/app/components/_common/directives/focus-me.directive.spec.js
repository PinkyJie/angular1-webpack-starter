import FocusMeDirective from './focus-me.directive';

describe('FocusMe Directive', () => {
    let scope;
    let element;

    beforeEach(() => {
        angular.module('test', [])
            .directive('aioFocusMe', FocusMeDirective);
        angular.mock.module('test');
    });

    beforeEach(() => {
        angular.mock.inject(($rootScope, $compile) => {
            scope = $rootScope.$new();
            scope.isFocus = true;
            element = $compile('<input aio-focus-me="isFocus" />')(scope);
            // spy needs to be put before $digest
            spyOn(element[0], 'focus');
        });
    });

    it('should make element get focus when attribute is true', () => {
        scope.$digest();
        expect(element[0].focus).toHaveBeenCalled();
    });

    it('should make element lose focus when attribute is false', () => {
        scope.isFocus = false;
        scope.$digest();
        expect(element[0].focus).not.toHaveBeenCalled();
    });
});
