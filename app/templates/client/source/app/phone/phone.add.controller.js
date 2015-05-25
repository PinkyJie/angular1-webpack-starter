(function () {
    'use strict';

    angular
        .module('app.phone')
        .controller('PhoneAddController', PhoneAddController);

    PhoneAddController.$inject = ['phoneAPI', '$state', 'ajaxErrorHanlder',
        'LxNotificationService'];
    /* @ngInject */
    function PhoneAddController (phoneAPI, $state, ajaxErrorHanlder,
        LxNotificationService) {
        var vm = this;

        vm.addNewPhone = addNewPhone;

        init();

        /////////////

        function init () {
            vm.phone = {};
            vm.state = 'add';
        }

        function addNewPhone (phone) {
            phoneAPI.addNewPhone(phone)
                .then(success)
                .catch(error);

            function success (data) {
                $state.go('root.phone');
            }

            function error (reason) {
                var message = ajaxErrorHanlder.getMessage(reason);
                LxNotificationService.alert('Add phone error', message, 'OK');
            }
        }

    }
})();
