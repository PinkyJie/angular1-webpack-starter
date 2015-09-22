appTestConfig.$inject = ['$httpProvider'];
function appTestConfig ($httpProvider) {
    $httpProvider.interceptors.push(apiDelayInterceptor);

    apiDelayInterceptor.$inject = ['$timeout', '$q'];
    function apiDelayInterceptor ($timeout, $q) {
        return {
            response (response) {
                // all API response will be delayed 1s to simulate real network
                const delay = 1000;
                if (response.config.url.match(/^api\//)) {
                    const d = $q.defer();
                    $timeout(() => {
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
function appTestRun ($httpBackend) {
    // pass through static files
    $httpBackend.whenGET(/^static\//).passThrough();
}

export {appTestConfig, appTestRun};
