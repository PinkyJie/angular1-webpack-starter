import LoginPage from './login.page';
import PhoneFormComp from './phone-form.comp';

// phone detail page object
class PhoneDetailPage extends browser._BasePageObject {
    constructor () {
        super('phone/1');
        this.data = {
            phone: {
                Model: 'iPhone 6',
                OS: 'iOS',
                Price: '5288',
                'Screen Size': '4.7',
                Manufacturer: 'Apple',
                'Release Date': 'October 9, 2014',
                date: '2014-10-9'
            }
        };
    }

    _getAllElements () {
        const $page = $('.phone-detail-view');
        const $header = $page.$('.card-header');
        return {
            title: $header.$('.title'),
            editBtn: $header.$('button'),
            form: new PhoneFormComp($page)
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

export default PhoneDetailPage;
