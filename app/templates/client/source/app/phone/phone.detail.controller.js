(function () {
    'use strict';

    angular
        .module('app.phone')
        .controller('PhoneDetailController', PhoneDetailController);

    PhoneDetailController.$inject = ['phoneAPI', '$stateParams', 'ajaxErrorHanlder',
        'LxNotificationService'];
    /* @ngInject */
    function PhoneDetailController (phoneAPI, $stateParams, ajaxErrorHanlder,
        LxNotificationService) {
        var vm = this;

        vm.state = 'view';
        vm.beginEdit = beginEdit;
        vm.cancelUpdate = cancelUpdate;
        vm.updatePhone = updatePhone;

        var _originalPhone;

        init();

        /////////////

        function init () {
            var id = $stateParams.id;
            if (id) {
                _getPhoneDetail(id);
            }
        }

        function _getPhoneDetail (id) {
            phoneAPI.getPhoneDetail(id)
                .then(function (data) {
                    vm.phone = data;
                });
        }

        function beginEdit () {
            _originalPhone = angular.copy(vm.phone);
            vm.state = 'edit';
        }

        function cancelUpdate () {
            vm.phone = angular.copy(_originalPhone);
            vm.state = 'view';
        }

        function updatePhone (phone) {
            phoneAPI.updatePhone(phone.id, phone)
                .then(success)
                .catch(error);

            function success (data) {
                vm.state = 'view';
            }

            function error (reason) {
                var message = ajaxErrorHanlder.getMessage(reason);
                LxNotificationService.alert('Update phone error', message, 'OK', function () {
                    cancelUpdate();
                });
            }
        }

    }
})();
