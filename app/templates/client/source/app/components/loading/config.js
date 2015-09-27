function appLoadingConfig (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.loadingBarTemplate = '<div class="loading-view"><div class="progress"><div class="indeterminate"></div></div></div>';
}

appLoadingConfig.$inject = ['cfpLoadingBarProvider'];

export default appLoadingConfig;
