(function() {
    'use strict';

    angular
        .module('app.login')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'root.login',
                config: {
                    url: '/login?action',
                    views: {
                        'main@': {
                            templateUrl: 'static/login/login.html',
                            controller: 'LoginController as vm'
                        },
                        'sidebar@': {
                            template: ''
                        }
                    },
                    data: {
                        title: 'Login',
                        _class: 'login'
                    },
                    breadcrumb: 'Login'
                }
            }
        ];
    }
})();
