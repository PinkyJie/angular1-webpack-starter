import loginPage from './login.spec';
import PhoneForm from './components/phone-form';

// page object
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

module.exports = new PhoneDetailPage();

// test scenarios
describe('Phone Detail Page:', () => {
    let page;
    beforeEach(() => {
        page = new PhoneDetailPage();
        page.load();
    });

    describe('Layout:', () => {
        it('should have correct layout', () => {
            const config = {
                url: 'phone/1',
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
                            text: 'Phone Detail'
                        }
                    ]
                }
            };
            page.assertCorrectLayout(config);
        });
    });

    describe('Phone Detail section:', () => {
        it('should show correct phone detail', () => {
            expect(page.ele.title.getText()).toEqual(page.data.phone.Model);
            expect(page.ele.editBtn.$('i')).toHaveClass('mdi-image-edit');
            page.ele.form.assertPhoneDetail(page.data.phone);
        });
    });

    describe('Phone Edit section:', () => {
        let formField;
        beforeEach(() => {
            formField = page.ele.form.ele.field;
        });

        it('should show phone edit view correctly', () => {
            expect(formField.view.get(0).isDisplayed()).toBe(false);
            expect(page.ele.form.ele.cancelBtn.isDisplayed()).toBe(false);
            expect(page.ele.form.ele.saveBtn.isDisplayed()).toBe(false);
            // click edit
            page.ele.editBtn.click();
            expect(formField.view.get(0).isDisplayed()).toBe(true);
            expect(page.ele.form.ele.cancelBtn.isDisplayed()).toBe(true);
            expect(page.ele.form.ele.saveBtn.isDisplayed()).toBe(true);
            expect(page.ele.form.ele.saveBtn.isEnabled()).toBe(false);
            // check label/value
            page.ele.form.assertEditPhoneDetail(page.data.phone);
        });

        it('should cancel editing after clicking cancel button', () => {
            // click edit
            page.ele.editBtn.click();
            // edit model
            const modelInput = formField.view.get(0).$(formField.input);
            modelInput.clear();
            modelInput.sendKeys('abcdefg');
            // click cancel
            page.ele.form.ele.cancelBtn.click();
            // check phone detail not changed
            page.ele.form.assertPhoneDetail(page.data.phone);
        });

        it('should allow editing every field in form', () => {
            const newPhone = {
                Model: 'iPhone 6 123',
                OS: 'Android',
                Price: '1234',
                'Screen Size': '12.3',
                Manufacturer: 'abcd',
                'Release Date': 'October 17, 2014',
                date: '2014-10-17'
            };
            page.ele.editBtn.click();
            page.ele.form.assertEditingForm(newPhone, false);
            // check new phone detail
            page.ele.form.assertPhoneDetail(newPhone);
        });
    });
});
