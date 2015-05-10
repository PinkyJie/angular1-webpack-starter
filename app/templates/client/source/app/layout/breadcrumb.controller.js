(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('BreadcrumbController', BreadcrumbController);

    BreadcrumbController.$inject = ['routerHelper'];
    /* @ngInject */
    function BreadcrumbController(routerHelper) {
        var vm = this;
    }
})();
