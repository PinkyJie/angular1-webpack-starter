(function () {
    'use strict';

    angular
        .module('app.phone')
        .controller('PhoneDetailController', PhoneDetailController);

    PhoneDetailController.$inject = ['phoneAPI', '$stateParams', 'ajaxErrorHanlder',
        'LxNotificationService', '$q'];
    /* @ngInject */
    function PhoneDetailController (phoneAPI, $stateParams, ajaxErrorHanlder,
        LxNotificationService, $q) {
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
            var d = $q.defer();
            phoneAPI.updatePhone(phone.id, phone)
                .then(success)
                .catch(error);
            // return promise here to let the phone form controller know
            // the response status
            return d.promise;

            function success (data) {
                vm.state = 'view';
                vm.phone = data;
                d.resolve();
            }

            function error (reason) {
                var message = ajaxErrorHanlder.getMessage(reason);
                LxNotificationService.alert('Update phone error', message, 'OK', function () {
                    cancelUpdate();
                });
                d.reject();
            }
        }

    }
})();
