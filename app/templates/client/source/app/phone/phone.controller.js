(function () {
    'use strict';

    angular
        .module('app.phone')
        .controller('PhoneController', PhoneController);

    PhoneController.$inject = ['phoneAPI'];
    /* @ngInject */
    function PhoneController (phoneAPI) {
        var vm = this;

        init();

        /////////////

        function init () {
            phoneAPI.getPhones()
                .then(function (data) {
                    vm.phones = data;
                });
        }

    }
})();
