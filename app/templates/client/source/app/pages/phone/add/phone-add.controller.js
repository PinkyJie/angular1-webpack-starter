class PhoneAddController {
    constructor (PhoneAPI, $state, $q) {
        this.PhoneAPI = PhoneAPI;
        this.$state = $state;
        this.$q = $q;

        this.phone = {};
        this.state = 'add';
    }

    addNewPhone (ctrl, phone) {
        // return promise here to let the phone form controller know the response status
        return ctrl.PhoneAPI.addNewPhone(phone)
            .then(_success)
            .catch(_error);

        function _success () {
            ctrl.$state.go('root.layout.phone');
        }

        function _error (message) {
            ctrl.LxNotificationService.alert('Add phone error', message, 'OK');
            return ctrl.$q.reject();
        }
    }

}

PhoneAddController.$inject = ['PhoneAPI', '$state', '$q'];

export default PhoneAddController;
