function SelectInitDirective () {
    return {
        restrict: 'A',
        link
    };

    function link (scope, element, attrs) {
        scope.$watch(attrs.ngModel, initSelect);
        function initSelect () {
            element.siblings('.caret').remove();
            element.material_select();
        }
    }
}

SelectInitDirective.$inject = [];

export default SelectInitDirective;
