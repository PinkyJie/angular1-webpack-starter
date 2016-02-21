import RouterHelperProvider from './router-helper.provider';

describe('RouterHelper Provider', () => {
    let RouterHelper;
    let provider;
    let $locationProvider;
    let $stateProvider;
    let $urlRouterProvider;
    let $rootScope;
    let $state;
    let Logger;
    let Resolve;

    beforeEach(() => {
        angular.module('test', [])
            .provider('RouterHelper', RouterHelperProvider);
    });

    beforeEach(() => {
        // function passed to module() does not get called until inject() does it's thing
        angular.mock.module(($provide) => {
            $provide.provider('$location', jasmine.createSpyObj('$locationProvider', ['html5Mode', '$get']));
            $provide.provider('$urlRouter', jasmine.createSpyObj('$urlRouterProvider', ['otherwise', '$get']));
            $provide.provider('$state', jasmine.createSpyObj('$stateProvider', ['state', '$get']));
        });
        // provider needs to be mocked before module load
        angular.mock.module('test');
        // but service is not required to mock before module load
        angular.mock.module(($provide) => {
            $provide.value('$rootScope', jasmine.createSpyObj('$rootScope', ['$on']));
            $provide.value('Logger', jasmine.createSpyObj('Logger', ['warning']));
            $provide.value('Resolve', jasmine.createSpyObj('Resolve', ['login']));
        });
        angular.mock.module((_$locationProvider_, _$stateProvider_,
            _$urlRouterProvider_, _RouterHelperProvider_) => {
            $locationProvider = _$locationProvider_;
            $stateProvider = _$stateProvider_;
            $stateProvider.$get.and.returnValue(jasmine.createSpyObj('$get', ['get', 'go']));
            $urlRouterProvider = _$urlRouterProvider_;
            provider = _RouterHelperProvider_;
        });
    });

    beforeEach(() => {
        angular.mock.inject((_$rootScope_, _$state_, _Logger_, _Resolve_) => {
            $rootScope = _$rootScope_;
            $state = _$state_;
            Logger = _Logger_;
            Resolve = _Resolve_;
        });
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            expect(provider.$locationProvider).toBe($locationProvider);
            expect(provider.$stateProvider).toBe($stateProvider);
            expect(provider.$urlRouterProvider).toBe($urlRouterProvider);
            expect(provider.config.mainTitle).toEqual('');
            expect(provider.config.resolveAlways).toEqual({});
            expect($locationProvider.html5Mode).toHaveBeenCalledWith(true);
        });
    });

    describe('RouterHelper service', () => {
        let resolveFunc;
        let config;
        beforeEach(() => {
            resolveFunc = jasmine.createSpy('resolveFunc');
            config = {
                mainTitle: 'main title',
                resolveAlways: {
                    resolve1: resolveFunc
                }
            };
            provider.configure(config);
            RouterHelper = provider.$get($rootScope, $state, Logger, Resolve);
        });

        describe('constructor function', () => {
            it('should init successfully', () => {
                expect(RouterHelper.config).toEqual(config);
                // function call in constructor can not be tested
            });
        });

        describe('configureStates function', () => {
            describe('states config', () => {
                it('should not set states if passed a empty states array', () => {
                    RouterHelper.configureStates([]);
                    expect($stateProvider.state).not.toHaveBeenCalled();
                });

                function assertCommon (states, isLogin) {
                    RouterHelper.configureStates(states);
                    if (isLogin) {
                        expect(states[0].config.resolve.loginResolve).toEqual(Resolve.login);
                    } else {
                        expect(states[0].config.resolve.loginResolve).not.toBeDefined();
                    }
                    expect(states[0].config.resolve.resolve1).toEqual(resolveFunc);
                    expect($stateProvider.state).toHaveBeenCalledWith(states[0].state, states[0].config);
                }

                it('should set login resolve if "requireLogin" is true', () => {
                    const states = [
                        {
                            state: 'state',
                            config: {
                                data: {
                                    requireLogin: true
                                }
                            }
                        }
                    ];
                    assertCommon(states, true);
                });

                it('should not set login resolve if "requireLogin" is false', () => {
                    const states = [
                        {
                            state: 'state',
                            config: {
                                data: {
                                    requireLogin: false
                                }
                            }
                        }
                    ];
                    assertCommon(states, false);
                });

                it('should not set login resolve if no "requireLogin" passed', () => {
                    const states = [
                        {
                            state: 'state',
                            config: {
                                data: {}
                            }
                        }
                    ];
                    assertCommon(states, false);
                });

                it('should handle multiple states in one time', () => {
                    const states = [
                        {
                            state: 'state1',
                            config: {}
                        },
                        {
                            state: 'state2',
                            config: {
                                resolve: {
                                    resolve2: jasmine.createSpy('resolve2')
                                }
                            }
                        }
                    ];
                    RouterHelper.configureStates(states);
                    expect(states[0].config.resolve.loginResolve).not.toBeDefined();
                    expect(states[1].config.resolve.loginResolve).not.toBeDefined();
                    expect(states[1].config.resolve.resolve2).toBeDefined();
                    expect(states[0].config.resolve.resolve1).toEqual(resolveFunc);
                    expect(states[1].config.resolve.resolve1).toEqual(resolveFunc);
                    expect($stateProvider.state).toHaveBeenCalledWith(states[0].state, states[0].config);
                    expect($stateProvider.state).toHaveBeenCalledWith(states[1].state, states[1].config);
                });
            });

            describe('otherwise config', () => {
                it('should set otherwise if provided', () => {
                    RouterHelper.configureStates([], '/404');
                    expect($urlRouterProvider.otherwise).toHaveBeenCalledWith('/404');
                });

                it('should not set otherwise if not provided', () => {
                    RouterHelper.configureStates([]);
                    expect($urlRouterProvider.otherwise).not.toHaveBeenCalled();
                });

                it('should not set otherwise more than once', () => {
                    RouterHelper.configureStates([], '/404');
                    RouterHelper.configureStates([], '/404');
                    expect($urlRouterProvider.otherwise.calls.count()).toEqual(1);
                });
            });
        });

        describe('handleRoutingErrors function', () => {
            beforeEach(() => {
                expect($rootScope.$on).toHaveBeenCalled();
                expect($rootScope.$on.calls.argsFor(0)[0]).toBe('$stateChangeError');
            });

            function fireCallback (toState, toParams, error) {
                const callback = $rootScope.$on.calls.argsFor(0)[1];
                callback(null, toState, toParams, null, null, error);
            }

            describe('error message', () => {
                function assertCommon (destination, message) {
                    const log = `Error routing to ${destination}.\nReason: ${message}.`;
                    expect(Logger.warning).toHaveBeenCalledWith(log);
                }

                it('should log expected error if toState[title] is not null', () => {
                    const toState = {
                        title: 'title'
                    };
                    const error = 'error';
                    fireCallback(toState, null, error);
                    assertCommon(toState.title, error);
                });

                it('should log expected error if toState[name] is not null', () => {
                    const toState = {
                        name: 'name'
                    };
                    const error = {
                        message: 'message'
                    };
                    fireCallback(toState, null, error);
                    assertCommon(toState.name, error.message);
                });

                it('should log expected error if toState[loadedTemplateUrl] is not null', () => {
                    const toState = {
                        loadedTemplateUrl: 'loadedTemplateUrl'
                    };
                    const error = null;
                    fireCallback(toState, null, error);
                    assertCommon(toState.loadedTemplateUrl, 'null');
                });

                it('should log expected error if toState is null', () => {
                    const toState = null;
                    const error = {
                        aaa: 'not message'
                    };
                    fireCallback(toState, null, error);
                    assertCommon('unknown target', '[object Object]');
                });
            });

            describe('page redirection', () => {
                let toState;
                let toParams;

                beforeEach(() => {
                    toState = {
                        name: 'name'
                    };
                    toParams = 'toParams';
                });

                it('should go to login page if error is requireLogin', () => {
                    fireCallback(toState, toParams, 'requireLogin');
                    expect($state.prev).toEqual({
                        state: toState.name,
                        params: toParams
                    });
                    expect($state.go).toHaveBeenCalledWith('root.layout.login');
                });

                it('should go to home page if error is something else', () => {
                    fireCallback(toState, toParams, 'error');
                    expect($state.prev).not.toBeDefined();
                    expect($state.go).toHaveBeenCalledWith('root.layout.home');
                });
            });

            it('should not hanlde error more than once', () => {
                fireCallback();
                fireCallback();
                expect(Logger.warning.calls.count()).toEqual(1);
                expect($state.go.calls.count()).toEqual(1);
            });
        });

        describe('getStates function', () => {
            beforeEach(() => {
                RouterHelper.getStates();
            });

            it('should call $state\'s get function', () => {
                expect($state.get).toHaveBeenCalled();
            });
        });

        describe('updateDocTitle function', () => {
            let eventData;
            beforeEach(() => {
                eventData = {
                    data: {
                        title: 'title',
                        _class: 'class'
                    }
                };
                expect($rootScope.$on).toHaveBeenCalled();
                expect($rootScope.$on.calls.argsFor(1)[0]).toBe('$stateChangeSuccess');
                const callback = $rootScope.$on.calls.argsFor(1)[1];
                callback(null, eventData);
            });
            it('should set correct title on $rootScope', () => {
                expect($rootScope.title).toEqual(`${eventData.data.title} - ${config.mainTitle}`);
                expect($rootScope._class).toEqual(eventData.data._class);
            });
        });
    });
});
