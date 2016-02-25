import LoginPage from './login.page';

// dashboard page object
class DashboardPage extends browser._BasePageObject {
    constructor () {
        super('dashboard');
    }

    _getAllElements () {
        const $page = $('.dashboard-view');
        const bannerClass = '.banner-view';
        const menuBoxClass = '.square-menu-view';
        return {
            banner: $page.$(bannerClass),
            bannerText: $page.$(`${bannerClass} p`),
            menuBoxes: $page.$(menuBoxClass),
            menuBox: {
                view: $page.$$(`${menuBoxClass} > .box`),
                icon: 'i',
                name: '.name',
                count: '.count'
            }
        };
    }

    // overrite load function to support login
    load () {
        super.load();
        const loginPage = new LoginPage();
        browser._.expectUrlToMatch(loginPage.url);
        loginPage.loginWithCredential('f@f', 'f');
        browser._.expectUrlToMatch(this.url);
    }
}

export default DashboardPage;
