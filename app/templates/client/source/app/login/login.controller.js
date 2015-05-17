(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['User', '$state', 'ajaxErrorHanlder'];
    /* @ngInject */
    function LoginController(User, $state, ajaxErrorHanlder) {
        var vm = this;

        vm.login = login;

        var _routeAfterLogin = 'root.dashboard';

        init();

        ////////////

        function init () {
            // handle logout
            var action = $state.params.action;
            if (action === 'logout') {
                User.logout()
                    .then(function () {
                        _setError('success', 'You have been successfully logged out!');
                    });
            } else {
                // check login status firstly
                User.checkLoggedInStatus()
                    .then(function () {
                        $state.go(_routeAfterLogin);
                    });
            }
        }

        function login (credential) {
            User.login(credential.email, credential.password)
                .then(success)
                .catch(error);

            function success (data) {
                vm.loginError = null;
                $state.go(_routeAfterLogin);
            }

            function error (reason) {
                var message = ajaxErrorHanlder.getMessage(reason);
                _setError('error', message);
            }
        }

        function _setError (type, text) {
            vm.loginError = {
                type: type,
                text: text
            };
        }
    }
})();
