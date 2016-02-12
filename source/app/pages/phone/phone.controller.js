class PhoneController {
    constructor (PhoneAPI, $state, Modal) {
        Object.assign(this, {PhoneAPI, $state, Modal});

        this._getPhoneList();
    }

    _getPhoneList () {
        this.PhoneAPI.getPhones()
            .then((data) => {
                this.phones = data;
            });
    }

    gotoPhoneDetail (phone) {
        this.$state.go('root.layout.phone.detail', {id: phone.id});
    }

    deletePhone (phone) {
        this.Modal.open(
            'Are your sure?',
            `All information about [${phone.model}] will be REMOVED!`,
            {ok: 'delete', cancel: 'cancel'},
            (answer) => {
                if (answer) {
                    this._doDelete(phone.id);
                }
            }
        );
    }

    _doDelete (id) {
        const self = this;
        this.PhoneAPI.removePhone(id)
            .then(_success)
            .catch(_error);

        function _success () {
            self._getPhoneList();
        }

        function _error (message) {
            self.Modal.open(
                'Delete phone error',
                message.text,
                {ok: 'OK'},
                (answer) => {
                    if (answer) {
                        self._getPhoneList();
                    }
                }
            );
        }
    }
}

PhoneController.$inject = ['PhoneAPI', '$state', 'Modal'];

export default PhoneController;
