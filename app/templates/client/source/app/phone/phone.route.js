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
            },
            {
                state: 'root.phone.add',
                config: {
                    url: '/add',
                    views: {
                        'main@': {
                            templateUrl: 'static/phone/phone.add.html',
                            controller: 'PhoneAddController as vm'
                        }
                    },
                    breadcrumb: 'Add'
                }
            },
            {
                state: 'root.phone.detail',
                config: {
                    url: '/:id',
                    views: {
                        'main@': {
                            templateUrl: 'static/phone/phone.detail.html',
                            controller: 'PhoneDetailController as vm'
                        }
                    },
                    breadcrumb: 'Detail'
                }
            }
        ];
    }
})();
