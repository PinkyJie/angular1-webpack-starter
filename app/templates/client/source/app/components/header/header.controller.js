class HeaderController {
    constructor ($rootScope, Event) {
        this.$rootScope = $rootScope;
        this.Event = Event;

        // udpate header based on auth event
        this.$rootScope.$on(this.Event.AUTH_LOGIN, this.updateHeader);
        this.$rootScope.$on(this.Event.AUTH_LOGOUT, this.updateHeader);
        this.$rootScope.$on(this.Event.AUTH_SESSION_VALID, this.updateHeader);
    }

    updateHeader (e, userInfo) {
        if (userInfo) {
            this.isLoggedIn = true;
            this.userInfo = userInfo;
        } else {
            this.isLoggedIn = false;
            this.userInfo = null;
        }
    }

    switchSidebar () {
        this.$rootScope.showSidebar = !this.$rootScope.showSidebar;
    }
}

HeaderController.$inject = ['$rootScope', 'Event'];

export default HeaderController;
