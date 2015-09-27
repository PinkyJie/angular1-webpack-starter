class PhoneController {
    constructor (PhoneAPI, $state) {
        this.PhoneAPI = PhoneAPI;
        this.$state = $state;
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
        const _ctrl = ctrl;
        ctrl.LxNotificationService.confirm('Are your sure?',
            `All information about [${phone.model}] will be REMOVED!`,
            {cancel: 'cancel', ok: 'delete'},
            (answer) => {
                if (answer) {
                    _ctrl._doDelete(phone.id);
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
            self.LxNotificationService.alert('Delete phone error', message, 'OK', () => {
                self._getPhoneList();
            });
        }
    }
}

PhoneController.$inject = ['PhoneAPI', '$state'];

export default PhoneController;
