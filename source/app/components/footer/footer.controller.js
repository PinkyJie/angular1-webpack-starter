class FooterController {
    constructor () {
        this.year = (new Date()).getFullYear();
    }
}

FooterController.$inject = [];

export default FooterController;
