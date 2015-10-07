class SidebarSmController {
    constructor ($rootScope) {
        this.$rootScope = $rootScope;
    }
    toggleSidebar (flag) {
        if (typeof flag === 'undefined') {
            this.$rootScope.showSidebar = !this.$rootScope.showSidebar;
        } else {
            this.$rootScope.showSidebar = flag;
        }
    }
}

SidebarSmController.$inject = ['$rootScope'];

export default SidebarSmController;
