(function () {
    'use strict';

    angular
        .module('app.phone')
        .controller('PhoneAddController', PhoneAddController);

    PhoneAddController.$inject = ['phoneAPI', '$state', 'ajaxErrorHandler',
        'LxNotificationService', '$q'];
    /* @ngInject */
    function PhoneAddController (phoneAPI, $state, ajaxErrorHandler,
        LxNotificationService, $q) {
        var vm = this;

        vm.addNewPhone = addNewPhone;

        init();

        /////////////

        function init () {
            vm.phone = {};
            vm.state = 'add';
        }

        function addNewPhone (phone) {
            // return promise here to let the phone form controller know the response status
            return phoneAPI.addNewPhone(phone)
                .then(_success)
                .catch(_error);

            function _success (data) {
                $state.go('root.phone');
                return;
            }

            function _error (reason) {
                var message = ajaxErrorHandler.getMessage(reason);
                LxNotificationService.alert('Add phone error', message, 'OK');
                return $q.reject();
            }
        }

    }
})();
