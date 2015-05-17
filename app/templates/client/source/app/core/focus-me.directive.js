(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('aioFocusMe', FocusMe);

    FocusMe.$inject = ['$timeout'];
    /* @ngInject */
    function FocusMe ($timeout) {
        var directive = {
            restrict: 'A',
            link: link
        };
        return directive;

        //////////

        function link (scope, element, attrs) {
            scope.$watch(attrs.aioFocusMe, function (val) {
                if (val) {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
        }
    }
})();
