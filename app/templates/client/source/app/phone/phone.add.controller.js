(function () {
    'use strict';

    angular
        .module('app.phone')
        .controller('PhoneAddController', PhoneAddController);

    PhoneAddController.$inject = ['phoneAPI'];
    /* @ngInject */
    function PhoneAddController (phoneAPI) {
        var vm = this;

        init();

        /////////////

        function init () {
            vm.phone = {};
        }

    }
})();
