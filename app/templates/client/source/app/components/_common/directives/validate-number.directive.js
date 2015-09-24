ValidateNumberDirective.$inject = [];
function ValidateNumberDirective () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link
    };

    function link (scope, element, attrs, ctrl) {
        const pattern = /^\d+(\.\d{1,2})?$/;
        ctrl.$validators.number = function numberValidator (modelValue, viewModel) {
            if (pattern.test(viewModel)) {
                return true;
            }
            return false;
        };
    }
}

export default ValidateNumberDirective;
