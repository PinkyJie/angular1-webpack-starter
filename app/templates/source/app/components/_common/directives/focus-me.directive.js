function FocusMeDirective () {
    return {
        restrict: 'A',
        link
    };

    function link (scope, element, attrs) {
        scope.$watch(attrs.aioFocusMe, (val) => {
            if (val) {
                scope.$evalAsync(() => {
                    element[0].focus();
                });
            }
        });
    }
}

FocusMeDirective.$inject = [];

export default FocusMeDirective;
