import BannerDirective from './banner.directive';

describe('Banner Directive', () => {
    let element;

    beforeEach(() => {
        angular.module('test', [])
            .directive('aioBanner', BannerDirective);
        angular.mock.module('test');
    });

    beforeEach(() => {
        angular.mock.inject(($compile, $rootScope) => {
            const scope = $rootScope.$new();
            scope.text = 'test text';
            element = $compile('<aio-banner text="text"></aio-banner>')(scope);
            scope.$digest();
        });
    });

    it('should has correct content passed in', () => {
        expect(element.find('p').text()).toEqual('test text');
    });
});
