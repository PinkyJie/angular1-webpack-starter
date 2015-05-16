(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$state', '$rootScope', 'User'];
    /* @ngInject */
    function HeaderController($state, $rootScope, User) {
        var vm = this;

        vm.go = $state.go;
        vm.switchSidebar = switchSidebar;

        ////////////

        function switchSidebar () {
            $rootScope.showSidebar = !$rootScope.showSidebar;
        }
    }
})();
