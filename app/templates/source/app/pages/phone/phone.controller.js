class PhoneController {
    constructor (PhoneAPI, $state, Modal) {
        this.PhoneAPI = PhoneAPI;
        this.$state = $state;
        this.Modal = Modal;
        this._getPhoneList();
    }
    _getPhoneList () {
        this.PhoneAPI.getPhones()
            .then((data) => {
                this.phones = data;
            });
    }
    gotoPhoneDetail (ctrl, phone) {
        // don't use this here, this point to directive context,
        // not controller context
        ctrl.$state.go('root.layout.phone.detail', {id: phone.id});
    }
    deletePhone (ctrl, phone) {
        ctrl.Modal.open(
            'Are your sure?',
            `All information about [${phone.model}] will be REMOVED!`,
            {ok: 'delete', cancel: 'cancel'},
            (answer) => {
                if (answer) {
                    ctrl._doDelete(phone.id);
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
