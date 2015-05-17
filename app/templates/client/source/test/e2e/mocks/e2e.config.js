(function () {
    'use strict';

    angular
        .module('appTest')
        .config(appTestConfig)
        .run(appTestRun);

    appTestConfig.$inject = ['$httpProvider'];
    /* @ngInject */
    function appTestConfig ($httpProvider) {
        $httpProvider.interceptors.push(apiDelayInterceptor);

        apiDelayInterceptor.$inject = ['$timeout', '$q'];
        /* @ngInject */
        function apiDelayInterceptor ($timeout, $q) {
            return {
                'response': function (response) {
                    // all API response will be delayed 1s to simulate real network
                    var delay = 1000;
                    if (response.config.url.match(/^api\//)) {
                        var d = $q.defer();
                        $timeout(function () {
                            d.resolve(response);
                        }, delay);
                        return d.promise;
                    }
                    return response;
                }
            };
        }
    }

    appTestRun.$inject = ['$httpBackend'];
    /* @ngInject */
    function appTestRun ($httpBackend) {
        // pass through static files
        $httpBackend.whenGET(/^static\//).passThrough();
    }

})();
