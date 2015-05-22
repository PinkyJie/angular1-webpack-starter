(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['user'];
    /* @ngInject */
    function DashboardController (user) {
        var vm = this;

        vm.colors = [
            'bgc-indigo-500',
            'bgc-red-500',
            'bgc-pink-500'
        ];

        init();

        //////////////

        function init () {
            vm.userInfo = user.getUserInfo();
            _getProductsSummary();
        }

        function _getProductsSummary () {
            user.getProductSummary()
                .then(function (data) {
                    vm.products = data;
                    vm.products.forEach(function (product) {
                        product.link = 'root.' + product.name;
                    });
                });
        }
    }
})();
