LoadingButton.$inject = [];
function LoadingButton () {
    return {
        restrict: 'A',
        link
    };

    function link (scope, element, attrs) {
        const spinner = '<i class="mdi mdi-sync icon-rotate-animation"></i>';
        scope.$watch(attrs.aioLoadingButton, (val) => {
            if (val) {
                element.prepend(spinner);
            } else {
                element.find('.icon-rotate-animation').remove();
            }
        });
    }
}

export default LoadingButton;
