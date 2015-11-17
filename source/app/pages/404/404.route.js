import angular from 'angular';

appNotfoundRun.$inject = ['RouterHelper'];
function appNotfoundRun (RouterHelper) {
    const otherwise = '/404';
    RouterHelper.configureStates(getStates(), otherwise);
}

function getStates () {
    return [
        {
            state: 'root.layout.notfound',
            config: {
                url: '/404',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./404.jade'));
                                }, '404');
                            });
                        }]
                    },
                    'sidebar@root': {}
                },
                data: {
                    title: '404',
                    _class: 'notfound'
                },
                breadcrumb: '404',
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').name});
                                resolve();
                            }, '404');
                        });
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.404', [])
    .run(appNotfoundRun);
