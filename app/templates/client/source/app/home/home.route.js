(function() {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'root.home',
                config: {
                    url: '/',
                    views: {
                        'main@': {
                            templateUrl: 'static/home/home.html'
                        }
                    },
                    data: {
                        title: 'Home',
                        _class: 'home'
                    }
                }
            }
        ];
    }
})();
