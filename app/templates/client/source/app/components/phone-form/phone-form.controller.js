class PhoneFormController {
    constructor () {
        this.allOS = ['Android', 'iOS', 'Windows Phone'];
    }
    submitForm (phone) {
        if (this.phoneForm.$invalid || !this.phone.releaseDate) {
            return;
        }
        this.isRequest = true;
        // call submit method passed in from outer scope
        this.submit({phone})
            .then(() => {
                this._endRequest();
                this.phoneForm.$setPristine();
            })
            .catch(this._endRequest.bind(this));
    }

    _endRequest () {
        this.isRequest = false;
    }
}

PhoneFormController.$inject = [];

export default PhoneFormController;
