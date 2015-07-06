(function () {
    'use strict';

    angular
        .module('app.phone')
        .controller('PhoneController', PhoneController);

    PhoneController.$inject = ['phoneAPI', 'ajaxErrorHanlder', 'LxNotificationService'];
    /* @ngInject */
    function PhoneController (phoneAPI, ajaxErrorHanlder, LxNotificationService) {
        var vm = this;

        vm.deletePhone = deletePhone;

        init();

        /////////////

        function init () {
            _getPhoneList();
        }

        function _getPhoneList () {
            phoneAPI.getPhones()
                .then(function (data) {
                    vm.phones = data;
                });
        }

        function deletePhone (id, name) {
            LxNotificationService.confirm('Are your sure?',
                'All information about [' + name + '] will be REMOVED!',
                {cancel:'cancel', ok:'delete'},
                function (answer) {
                    if (answer) {
                        _doDelete(id);
                    }
                }
            );
        }

        function _doDelete (id) {
            phoneAPI.removePhone(id)
                .then(_success)
                .catch(_error);

            function _success (data) {
                _getPhoneList();
            }

            function _error (reason) {
                var message = ajaxErrorHanlder.getMessage(reason);
                LxNotificationService.alert('Delete phone error', message, 'OK', function () {
                    _getPhoneList();
                });
            }
        }

    }
})();
