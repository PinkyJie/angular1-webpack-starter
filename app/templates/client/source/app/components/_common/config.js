const config = {
    appTitle: 'Aio Angular App'
};

appConfig.$inject = ['RouterHelperProvider'];
function appConfig (RouterHelperProvider) {
    RouterHelperProvider.configure({mainTitle: config.appTitle});
}

export default appConfig;
