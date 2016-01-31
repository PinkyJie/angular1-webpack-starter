class PhoneAddController {
    constructor (PhoneAPI, $state, $q, Modal) {
        Object.assign(this, {PhoneAPI, $state, $q, Modal});

        this.phone = {};
        this.state = 'add';
    }

    addNewPhone (phone) {
        const self = this;
        // return promise here to let the phone form controller know the response status
        return this.PhoneAPI.addNewPhone(phone)
            .then(_success)
            .catch(_error);

        function _success () {
            self.$state.go('root.layout.phone');
        }

        function _error (message) {
            self.Modal.open('Add phone error', message.text, {ok: 'OK'});
            return self.$q.reject();
        }
    }
}

PhoneAddController.$inject = ['PhoneAPI', '$state', '$q', 'Modal'];

export default PhoneAddController;
