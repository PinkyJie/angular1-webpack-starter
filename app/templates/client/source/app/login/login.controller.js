(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['user', '$state', 'ajaxErrorHanlder'];
    /* @ngInject */
    function LoginController(user, $state, ajaxErrorHanlder) {
        var vm = this;

        vm.login = login;

        var _routeAfterLogin = 'root.dashboard';

        init();

        ////////////

        function init () {
            // handle logout
            var action = $state.params.action;
            if (action === 'logout') {
                user.logout()
                    .then(function () {
                        _setError('success', 'You have been successfully logged out!');
                    });
            } else {
                // check login status firstly
                user.checkLoggedInStatus()
                    .then(function () {
                        $state.go(_routeAfterLogin);
                    });
            }
        }

        function login (credential) {
            user.login(credential.email, credential.password)
                .then(success)
                .catch(error);

            function success (data) {
                vm.loginError = null;
                // user was redirect to login page
                if ($state.prev) {
                    $state.go($state.prev.state, $state.prev.params);
                    $state.prev = null;
                } else {
                    $state.go(_routeAfterLogin);
                }
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
