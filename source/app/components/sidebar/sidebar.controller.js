class SidebarController {
    constructor (RouterHelper, $scope, $rootScope) {
        Object.assign(this, {RouterHelper, $scope, $rootScope});

        // generate sidebar nav menus
        this.navs = this._getNavMenus();
        // tell others we have sidebar
        this.$rootScope.hasSidebar = true;
        this.$scope.$on('$destroy', () => {
            this.$rootScope.hasSidebar = false;
        });
    }

    hideSidebar () {
        this.$rootScope.showSidebar = false;
    }

    _getNavMenus () {
        const navs = [];
        const allStates = this.RouterHelper.getStates();
        allStates.forEach((state) => {
            if (state.sidebar) {
                const nav = state.sidebar;
                nav.link = state.name;
                navs.push(nav);
            }
        });
        return navs;
    }
}

SidebarController.$inject = ['RouterHelper', '$scope', '$rootScope'];

export default SidebarController;
