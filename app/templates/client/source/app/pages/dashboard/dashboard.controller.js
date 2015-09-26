class DashboardController {
    constructor (UserAPI) {
        this.UserAPI = UserAPI;
        this.colors = ['indigo', 'red', 'pink'];

        const userInfo = this.UserAPI.getUserInfo();
        this.welcomeMessage = `Welcome ${userInfo.name}!`;
        this._getProductsSummary();
    }
    _getProductsSummary () {
        this.UserAPI.getProductSummary()
            .then((data) => {
                this.products = data;
                this.products.forEach((product) => {
                    product.link = `root.layout.${product.name}`;
                });
            });
    }
}

DashboardController.$inject = ['UserAPI'];

export default DashboardController;
