function LoadingButtonDirective () {
    return {
        restrict: 'A',
        link
    };

    function link (scope, element, attrs) {
        const spinner = '<i class="left mdi-notification-sync icon-rotate-animation"></i>';
        scope.$watch(attrs.aioLoadingButton, (val) => {
            if (val) {
                element.prepend(spinner);
            } else {
                // jqLite only support find by tag name
                element.find('i').remove();
            }
        });
    }
}

LoadingButtonDirective.$inject = [];

export default LoadingButtonDirective;
