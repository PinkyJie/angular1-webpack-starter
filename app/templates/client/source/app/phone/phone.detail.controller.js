(function () {
    'use strict';

    angular
        .module('app.phone')
        .controller('PhoneDetailController', PhoneDetailController);

    PhoneDetailController.$inject = ['phoneAPI', '$stateParams'];
    /* @ngInject */
    function PhoneDetailController (phoneAPI, $stateParams) {
        var vm = this;

        vm.state = vm.isEditing ? 'edit' : 'view';

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

    }
})();
