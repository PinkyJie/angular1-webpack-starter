import LoadingButtonDirective from './loading-button.directive';

describe('LoadingButton Directive', () => {
    let scope;
    let element;

    beforeEach(() => {
        angular.module('test', [])
            .directive('aioLoadingButton', LoadingButtonDirective);
        angular.mock.module('test');
    });

    beforeEach(() => {
        angular.mock.inject(($rootScope, $compile) => {
            scope = $rootScope.$new();
            scope.isLoading = false;
            element = $compile('<button aio-loading-button="isLoading" ></button>')(scope);
        });
    });

    it('should not have loading spinner with false attribute', () => {
        scope.$digest();
        expect(element.find('i').length).toEqual(0);
    });

    it('should have loading spinner when attribute changes to true', () => {
        scope.isLoading = true;
        scope.$digest();
        expect(element.find('i').length).toEqual(1);
        // change back to false and spinner will be removed
        scope.isLoading = false;
        scope.$digest();
        expect(element.find('i').length).toEqual(0);
    });
});
