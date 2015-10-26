class SidebarSmController {
    constructor ($rootScope) {
        Object.assign(this, {$rootScope});
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
