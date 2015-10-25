class LoginController {
    constructor (UserAPI, $state, $timeout) {
        this.UserAPI = UserAPI;
        this.$state = $state;
        this.$timeout = $timeout;

        this.routeAfterLogin = 'root.layout.dashboard';

        // handle logout
        const action = this.$state.params.action;
        if (action === 'logout') {
            this.needCheckLogin = false;
            this.UserAPI.logout()
                .then(() => {
                    this.loginError = {
                        type: 'success',
                        text: 'You have been successfully logged out!'
                    };
                });
        } else {
            this.userInfo = null;
            this.needCheckLogin = true;
            const self = this;
            // check login status firstly
            this.UserAPI.checkLoggedInStatus()
                .then((data) => {
                    self.userInfo = data;
                    self.$timeout(() => {
                        self.$state.go(self.routeAfterLogin);
                    }, 1000);
                })
                .catch(() => {
                    self.needCheckLogin = false;
                });
        }
    }
}

LoginController.$inject = ['UserAPI', '$state', '$timeout'];

export default LoginController;
