function SelectInitDirective ($timeout) {
    return {
        restrict: 'A',
        link
    };

    function link (scope, element, attrs) {
        $timeout(initSelect);
        if (attrs.ngModel) {
            scope.$watch(attrs.ngModel, initSelect);
        }

        function initSelect () {
            element.siblings('.caret').remove();
            element.material_select();
        }
    }
}

SelectInitDirective.$inject = ['$timeout'];

export default SelectInitDirective;
