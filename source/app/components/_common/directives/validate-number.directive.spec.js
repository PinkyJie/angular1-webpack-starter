import ValidateNumberDirective from './validate-number.directive';

describe('ValidateNumber Directive', () => {
    let scope;
    let form;

    beforeEach(() => {
        angular.module('test', [])
            .directive('aioValidateNumber', ValidateNumberDirective);
    });

    beforeEach(() => {
        angular.mock.module('test');
    });

    beforeEach(() => {
        angular.mock.inject(($rootScope, $compile) => {
            scope = $rootScope.$new();
            scope.model = null;
            $compile(
                `<form name="form">
                    <input ng-model="model" name="numberInput" aio-validate-number />
                </form>`
            )(scope);
            scope.$digest();
            form = scope.form;
        });
    });

    it('should make element valid with number input', () => {
        // input simulation
        form.numberInput.$setViewValue('123');
        scope.$digest();
        expect(scope.model).toEqual('123');
        expect(form.numberInput.$valid).toBe(true);
        expect(form.numberInput.$error.number).not.toBeDefined();
    });

    it('should make element invalid with non number input', () => {
        form.numberInput.$setViewValue('abc');
        scope.$digest();
        expect(scope.model).not.toBeDefined();
        expect(form.numberInput.$valid).toBe(false);
        expect(form.numberInput.$error.number).toBe(true);
    });
});
