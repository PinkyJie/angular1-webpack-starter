import LoginPage from './login.page';

// phone page object
class PhonePage extends browser._BasePageObject {
    constructor () {
        super('phone');
    }

    _getAllElements () {
        const $page = $('.phone-main-view');
        return {
            addNewBtn: $page.$('.btn-add-new'),
            tableHeader: $page.$$('.heading th'),
            phoneItem: {
                view: $page.$$('.phone-item'),
                cell: 'td',
                firstBtn: '.btn-first',
                secondBtn: '.btn-second',
                icon: 'i'
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

export default PhonePage;
