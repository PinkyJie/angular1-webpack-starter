import angular from 'angular';

appPhoneRun.$inject = ['RouterHelper'];
function appPhoneRun (RouterHelper) {
    RouterHelper.configureStates(getStates());
}

function getStates () {
    return [
        {
            state: 'root.layout.phone',
            config: {
                url: '/phone',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./phone.jade'));
                                }, 'phone');
                            });
                        }],
                        controller: 'PhoneController as vm'
                    }
                },
                data: {
                    title: 'Phone',
                    _class: 'phone',
                    requireLogin: true
                },
                sidebar: {
                    icon: 'mdi-hardware-phone-android',
                    text: 'Phones'
                },
                breadcrumb: 'Phone List',
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').name});
                                resolve();
                            }, 'phone');
                        });
                    }]
                }
            }
        },
        {
            state: 'root.layout.phone.add',
            config: {
                url: '/add',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./add/phone-add.jade'));
                                }, 'phone');
                            });
                        }],
                        controller: 'PhoneAddController as vm'
                    }
                },
                breadcrumb: 'Add Phone'
            }
        },
        {
            state: 'root.layout.phone.detail',
            config: {
                url: '/:id',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./detail/phone-detail.jade'));
                                }, 'phone');
                            });
                        }],
                        controller: 'PhoneDetailController as vm'
                    }
                },
                breadcrumb: 'Phone Detail'
            }
        }
    ];
}

export default angular.module('app.routes.phone', [])
    .run(appPhoneRun);
