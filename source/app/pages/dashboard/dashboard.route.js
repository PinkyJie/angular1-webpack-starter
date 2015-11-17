import angular from 'angular';

appDashboardRun.$inject = ['RouterHelper'];
function appDashboardRun (RouterHelper) {
    RouterHelper.configureStates(getStates());
}

function getStates () {
    return [
        {
            state: 'root.layout.dashboard',
            config: {
                url: '/dashboard',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./dashboard.jade'));
                                }, 'dashboard');
                            });
                        }],
                        controller: 'DashboardController as vm'
                    }
                },
                data: {
                    title: 'Dashboard',
                    _class: 'dashboard',
                    requireLogin: true
                },
                sidebar: {
                    icon: 'mdi-action-dashboard',
                    text: 'Dashboard'
                },
                breadcrumb: 'Dashboard',
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').name});
                                resolve();
                            }, 'dashboard');
                        });
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.dashboard', [])
    .run(appDashboardRun);
