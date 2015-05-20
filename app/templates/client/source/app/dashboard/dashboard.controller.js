(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['user'];
    /* @ngInject */
    function DashboardController(user) {
        var vm = this;

        init();

        //////////////

        function init () {
            vm.userInfo = user.userInfo();
            vm.phoneLength = 20;
        }
    }
})();
