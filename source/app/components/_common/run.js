appRun.$inject = ['$rootScope'];
function appRun ($rootScope) {
    // TODO: need to figure out a btter way
    // IE hack
    $rootScope.ieClass = /MSIE|Trident/.test(window.navigator.userAgent) ? 'ie' : 'no-ie';
}

export default appRun;
