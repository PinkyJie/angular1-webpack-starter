import loginPage from './login.spec';
import PhoneForm from './components/phone-form';
import phonePage from './phone-main.spec';

// page object
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
    }

    _getAllElements () {
        const $page = $('.phone-add-view');
        const $header = $page.$('.card-header');
        return {
            title: $header.$('.title'),
            form: new PhoneForm($page)
        };
    }

    // overrite load function to support login
    load () {
        super.load();
        browser._.expectUrlToMatch(loginPage.url);
        loginPage.loginWithCredential('f@f', 'f');
        browser._.expectUrlToMatch(this.url);
    }
}

module.exports = new PhoneAddPage();

// test scenarios
describe('Phone Add Page:', () => {
    let page;
    beforeEach(() => {
        page = new PhoneAddPage();
        page.load();
    });

    describe('Layout:', () => {
        it('should have correct layout', () => {
            const config = {
                url: 'phone/add',
                title: 'Phone',
                klass: 'phone',
                header: 'login',
                sidebar: {
                    items: [
                        {
                            link: 'dashboard',
                            active: false,
                            icon: 'mdi-action-dashboard',
                            text: 'DASHBOARD'
                        },
                        {
                            link: 'phone',
                            active: true,
                            icon: 'mdi-hardware-phone-android',
                            text: 'PHONES'
                        }
                    ]
                },
                breadcrumb: {
                    items: [
                        {
                            link: 'phone',
                            text: 'Phone List'
                        },
                        {
                            link: false,
                            text: 'Add Phone'
                        }
                    ]
                }
            };
            page.assertCorrectLayout(config);
        });
    });

    describe('Phone Add section:', () => {
        it('should have correct inital state', () => {
            expect(page.ele.title.getText()).toEqual('Add a new phone');
            expect(page.ele.form.ele.cancelBtn.isDisplayed()).toBe(false);
            expect(page.ele.form.ele.saveBtn.isEnabled()).toBe(false);
            page.ele.form.assertEditPhoneDetail(page.data.phone);
        });

        it('should add phone correctly via form', () => {
            const newPhone = {
                Model: 'iPhone 17',
                OS: 'iOS',
                Price: '9999',
                'Screen Size': '9.9',
                Manufacturer: 'AppleApple',
                'Release Date': 'November 20, 2015',
                date: '2015-11-20'
            };
            page.ele.form.assertEditingForm(newPhone, true);
            // back to phone main page
            browser._.expectUrlToMatch(phonePage.url);
            // check last item is the new added item
            const phoneList = phonePage.ele.phoneItem;
            expect(phoneList.view.count()).toEqual(6);
            const lastItem = phoneList.view.get(5);
            const expectedItem = [newPhone.Model, newPhone.OS, newPhone.Price];
            lastItem.$$(phoneList.cell).each((td, index) => {
                if (index === 3) {
                    // ignore the last cell
                    return;
                }
                expect(td.getText()).toEqual(expectedItem[index]);
            });
        });
    });
});
