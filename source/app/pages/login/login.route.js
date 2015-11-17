import angular from 'angular';

appLoginRun.$inject = ['RouterHelper'];
function appLoginRun (RouterHelper) {
    RouterHelper.configureStates(getStates());
}

function getStates () {
    return [
        {
            state: 'root.layout.login',
            config: {
                url: '/login?action',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./login.jade'));
                                }, 'login');
                            });
                        }],
                        controller: 'LoginController as vm'
                    },
                    'breadcrumb@root': {},
                    'sidebar@root': {}
                },
                data: {
                    title: 'Login',
                    _class: 'login'
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').name});
                                resolve();
                            }, 'login');
                        });
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.login', [])
    .run(appLoginRun);
