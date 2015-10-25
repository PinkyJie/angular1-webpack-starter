import SquareMenuDirective from './square-menu.directive';

describe('SquareMenu Directive', () => {
    let element;
    let scope;

    beforeEach(() => {
        angular.module('test', [])
            .directive('aioSquareMenu', SquareMenuDirective);
        angular.mock.module('test');
    });

    beforeEach(() => {
        angular.mock.inject(($rootScope, $compile) => {
            scope = $rootScope.$new();
            scope.menuList = [
                {
                    link: 'link1',
                    icon: 'icon1',
                    count: 1,
                    name: 'name1'
                },
                {
                    link: 'link2',
                    icon: 'icon2',
                    count: 2,
                    name: 'name2'
                },
                {
                    link: 'link3',
                    icon: 'icon3',
                    count: 3,
                    name: 'name3'
                },
                {
                    link: 'link4',
                    icon: 'icon4',
                    count: 4,
                    name: 'name4'
                }
            ];
            scope.colorList = ['color0', 'color1', 'color2'];
            const template = '<aio-square-menu menus="menuList", colors="colorList"></aio-square-menu>';
            element = $compile(template)(scope);
            scope.$digest();
        });
    });

    it('should populate template correctly', () => {
        const menus = element.find('.box');
        for (let i = 0; i < menus.length; i++) {
            const menu = angular.element(menus[i]);
            expect(menu.attr('ui-sref')).toEqual(`link${i + 1}`);
            expect(menu.attr('class')).toMatch(new RegExp(`color${i % 3}`));
            expect(menu.find('i').attr('class')).toMatch(new RegExp(`icon${i + 1}`));
            expect(menu.find('.count').text()).toEqual(`${i + 1}`);
            expect(menu.find('.name').text()).toEqual(`name${i + 1}`);
        }
    });
});
