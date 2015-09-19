FocusMe.$inject = ['$timeout'];
function FocusMe ($timeout) {
    return {
        restrict: 'A',
        link
    };

    function link (scope, element, attrs) {
        scope.$watch(attrs.aioFocusMe, (val) => {
            if (val) {
                $timeout(() => {
                    element[0].focus();
                });
            }
        });
    }
}

export default FocusMe;
