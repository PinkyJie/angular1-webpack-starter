(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['routerHelper'];
    /* @ngInject */
    function SidebarController(routerHelper) {
        var vm = this;
    }
})();
