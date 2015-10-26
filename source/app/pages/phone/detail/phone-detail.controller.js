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

    cancelUpdate (ctrl) {
        ctrl.phone = angular.copy(ctrl[originalPhone]);
        ctrl.state = 'view';
    }

    updatePhone (ctrl, phone) {
        // return promise here to let the phone form controller know the response status
        return ctrl.PhoneAPI.updatePhone(phone.id, phone)
            .then(_success)
            .catch(_error);

        function _success (data) {
            ctrl.state = 'view';
            ctrl.phone = data;
        }

        function _error (message) {
            ctrl.Modal.open('Update phone error', message.text, {ok: 'OK'}, () => {
                ctrl.cancelUpdate(ctrl);
            });
            return ctrl.$q.reject();
        }
    }

}

PhoneDetailController.$inject = ['PhoneAPI', '$stateParams', '$q', 'Modal'];

export default PhoneDetailController;
