DropdownInitDirective.$inject = [];
function DropdownInitDirective () {
    return {
        restrict: 'A',
        link
    };

    function link (scope, element) {
        $(element).dropdown();
    }
}

DropdownInitDirective.$inject = [];

export default DropdownInitDirective;
