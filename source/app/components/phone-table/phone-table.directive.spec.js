import PhoneTableDirective from './phone-table.directive';
import PhoneTableController from './phone-table.controller';

describe('PhoneTable Directive', () => {
    let element;
    let scope;

    beforeEach(() => {
        angular.module('test', [])
            .controller('PhoneTableController', PhoneTableController)
            .directive('aioPhoneTable', PhoneTableDirective);
        angular.mock.module('test');
    });

    beforeEach(() => {
        angular.mock.inject(($compile, $rootScope) => {
            scope = $rootScope.$new();
            scope.phones = [
                {
                    id: 1,
                    model: 'model1',
                    os: 'os1',
                    price: 1111
                },
                {
                    id: 2,
                    model: 'model2',
                    os: 'os2',
                    price: 2222
                }
            ];
            scope.firstButtonClick = jasmine.createSpy('firstButtonClick');
            scope.secondButtonClick = jasmine.createSpy('secondButtonClick');
            const template = `
                <aio-phone-table phones="phones"
                    first-button-click="firstButtonClick(scope, phone)"
                    second-button-click="secondButtonClick(scope, phone)">
                </aio-phone-table>`;
            element = $compile(template)(scope);
            scope.$digest();
        });
    });

    it('should populate tempalte correctly', () => {
        const phoneItems = element.find('.phone-item');
        expect(phoneItems.length).toEqual(2);
        expect($(phoneItems[0]).find('td:eq(0)').text()).toEqual('model1');
        expect($(phoneItems[0]).find('td:eq(1)').text()).toEqual('os1');
        expect($(phoneItems[0]).find('td:eq(2)').text()).toEqual('1111');
        expect($(phoneItems[1]).find('td:eq(0)').text()).toEqual('model2');
        expect($(phoneItems[1]).find('td:eq(1)').text()).toEqual('os2');
        expect($(phoneItems[1]).find('td:eq(2)').text()).toEqual('2222');
    });

    it('should call first callback when clicking first button', () => {
        const phoneItems = element.find('.phone-item');
        $(phoneItems[0]).find('.btn-first').click();
        expect(scope.firstButtonClick).toHaveBeenCalled();
        expect(scope.firstButtonClick.calls.argsFor(0)[1]).toEqual(scope.phones[0]);
    });

    it('should call second callback when clicking second button', () => {
        const phoneItems = element.find('.phone-item');
        $(phoneItems[1]).find('.btn-second').click();
        expect(scope.secondButtonClick).toHaveBeenCalled();
        expect(scope.secondButtonClick.calls.argsFor(0)[1]).toEqual(scope.phones[1]);
    });
});
