function TooltipInitDirective () {
    return {
        restrict: 'A',
        link
    };

    function link (scope, element) {
        element.tooltip();
        // destroy tooltip, otherwise it will still display
        scope.$on('$destroy', () => {
            element.tooltip('remove');
        });
    }
}

TooltipInitDirective.$inject = [];

export default TooltipInitDirective;
