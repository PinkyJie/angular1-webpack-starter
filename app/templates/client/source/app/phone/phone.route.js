(function () {
    'use strict';

    angular
        .module('app.phone')
        .run(appRun);

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.phone',
                config: {
                    url: '/phone',
                    views: {
                        'main@': {
                            templateUrl: 'static/phone/phone.html',
                            controller: 'PhoneController as vm'
                        }
                    },
                    data: {
                        title: 'Phone',
                        _class: 'phone',
                        requireLogin: true
                    },
                    sidebar: {
                        icon: 'mdi-cellphone-android',
                        text: 'Phones'
                    },
                    breadcrumb: 'Phone'
                }
            }
        ];
    }
})();
