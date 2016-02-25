import LoginPage from './login.page';
import PhoneFormComp from './phone-form.comp';
import PhonePage from './phone-main.page';

// phone add page object
class PhoneAddPage extends browser._BasePageObject {
    constructor () {
        super('phone/add');
        this.data = {
            phone: {
                Model: '',
                OS: 'Choose OS Type',
                Price: '',
                'Screen Size': '',
                Manufacturer: '',
                'Release Date': '',
                date: ''
            }
        };
        this.phonePage = new PhonePage();
    }

    _getAllElements () {
        const $page = $('.phone-add-view');
        const $header = $page.$('.card-header');
        return {
            title: $header.$('.title'),
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

export default PhoneAddPage;
