class LoginFormController {
    constructor (UserAPI, $state) {
        this.UserAPI = UserAPI;
        this.$state = $state;
    }
    login (credential) {
        const self = this;
        if (this.loginForm.$invalid) {
            return;
        }
        this.loginError = null;
        this.isRequest = true;
        this.UserAPI.login(credential.email, credential.password)
            .then(_success)
            .catch(_error);

        function _success () {
            // user was redirect to login page from other page
            if (self.$state.prev) {
                self.$state.go(self.$state.prev.state, self.$state.prev.params);
                self.$state.prev = null;
            } else {
                self.$state.go(self.routeAfterLogin);
            }
        }

        function _error (message) {
            self._setError('error', message.text);
            self.isRequest = false;
        }
    }

    _setError (type, text) {
        this.loginError = {
            type,
            text
        };
    }
}

LoginFormController.$inject = ['UserAPI', '$state'];

export default LoginFormController;
