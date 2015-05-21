(function () {
    'use strict';

    angular
        .module('app.layout')
        .run(appRun);

    /* @ngInject */
    function appRun (routerHelper) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates () {
        return [
            {
                state: 'root',
                config: {
                    abstract: true,
                    url: '',
                    views: {
                        'loading': {
                            templateUrl: 'static/layout/loading.html',
                            controller: 'LoadingController as vm'
                        },
                        'header': {
                            templateUrl: 'static/layout/header.html',
                            controller: 'HeaderController as vm'
                        },
                        'sidebar': {
                            templateUrl: 'static/layout/sidebar.html',
                            controller: 'SidebarController as vm'
                        },
                        'breadcrumb': {
                            templateUrl: 'static/layout/breadcrumb.html',
                            controller: 'BreadcrumbController as vm'
                        },
                        'footer': {
                            templateUrl: 'static/layout/footer.html',
                            controller: 'FooterController as vm'
                        }
                    }
                }
            },
            {
                state: 'root.notfound',
                config: {
                    url: '/404',
                    views: {
                        'main@': {
                            templateUrl: 'static/layout/404.html'
                        },
                        'sidebar@': {
                            template: ''
                        }
                    },
                    data: {
                        title: '404',
                        _class: 'notfound'
                    },
                    breadcrumb: '404'
                }
            }
        ];
    }
})();
