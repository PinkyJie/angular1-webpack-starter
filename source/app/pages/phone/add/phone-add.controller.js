class PhoneAddController {
    constructor (PhoneAPI, $state, $q, Modal) {
        Object.assign(this, {PhoneAPI, $state, $q, Modal});

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
            ctrl.Modal.open('Add phone error', message.text, {ok: 'OK'});
            return ctrl.$q.reject();
        }
    }
}

PhoneAddController.$inject = ['PhoneAPI', '$state', '$q', 'Modal'];

export default PhoneAddController;
