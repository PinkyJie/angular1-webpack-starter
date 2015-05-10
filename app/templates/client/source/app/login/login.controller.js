(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['routerHelper'];
    /* @ngInject */
    function LoginController(routerHelper) {
        var vm = this;
    }
})();
