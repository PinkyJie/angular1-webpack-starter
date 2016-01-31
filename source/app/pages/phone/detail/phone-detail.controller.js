import angular from 'angular';

const originalPhone = Symbol();
class PhoneDetailController {
    constructor (PhoneAPI, $stateParams, $q, Modal) {
        Object.assign(this, {PhoneAPI, $stateParams, $q, Modal});

        this[originalPhone] = {};
        this.state = 'view';
        const id = $stateParams.id;
        if (id) {
            this._getPhoneDetail(id);
        }
    }

    _getPhoneDetail (id) {
        this.PhoneAPI.getPhoneDetail(id)
            .then((data) => {
                this.phone = data;
            });
    }

    beginEdit () {
        this[originalPhone] = angular.copy(this.phone);
        this.state = 'edit';
    }

    cancelUpdate () {
        this.phone = angular.copy(this[originalPhone]);
        this.state = 'view';
    }

    updatePhone (phone) {
        const self = this;
        // return promise here to let the phone form controller know the response status
        return this.PhoneAPI.updatePhone(phone.id, phone)
            .then(_success)
            .catch(_error);

        function _success (data) {
            self.state = 'view';
            self.phone = data;
        }

        function _error (message) {
            self.Modal.open('Update phone error', message.text, {ok: 'OK'}, () => {
                self.cancelUpdate();
            });
            return self.$q.reject();
        }
    }

}

PhoneDetailController.$inject = ['PhoneAPI', '$stateParams', '$q', 'Modal'];

export default PhoneDetailController;
