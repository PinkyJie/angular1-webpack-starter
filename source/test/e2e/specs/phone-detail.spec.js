import loginPage from './login.spec';

// page object
class PhoneDetailPage extends browser._BasePageObject {
    constructor () {
        super('phone/1');
        this.data = {
            fields: ['Model', 'OS', 'Price', 'Screen Size', 'Manufacturer', 'Release Date'],
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
        const $form = $page.$('.phone-form-view');
        const $header = $page.$('.card-header');
        return {
            title: $header.$('.title'),
            editBtn: $header.$('button'),
            label: {
                view: $form.$$('.form-label'),
                name: 'span:first-child',
                value: '.form-value'
            },
            field: {
                view: $form.$$('.form-field'),
                errorMsg: '.error-message',
                errorIcon: '.error-icon > i',
                input: '.form-control > input',
                selectInput: '.form-control > .select-wrapper > input',
                selectContent: '.form-control > .select-wrapper > .dropdown-content',
                datepicker: '.form-control > .picker',
                label: '.form-control > label'
            },
            saveBtn: $form.$('.btn-save'),
            cancelBtn: $form.$('.btn-cancel')
        };
    }

    // overrite load function to support login
    load () {
        super.load();
        browser._.expectUrlToMatch(loginPage.url);
        loginPage.loginWithCredential('f@f', 'f');
        browser._.expectUrlToMatch(this.url);
    }

    assertFormFieldError (field, isError, message) {
        const formField = this.ele.field;
        const input = field.$(formField.input);
        const errorIcon = field.$(formField.errorIcon);
        const errorMsg = field.$(formField.errorMsg);
        if (isError) {
            expect(input).toHaveClass('invalid');
            expect(errorIcon.isDisplayed()).toBe(true);
            expect(errorMsg.isDisplayed()).toBe(false);
            // simulate mouse hover
            browser.actions().mouseMove(errorIcon).perform();
            expect(errorMsg.isDisplayed()).toBe(true);
            expect(errorMsg.getText()).toEqual(message);
            // rollback mouse hover
            browser.actions().mouseMove(input).perform();
        } else {
            expect(input).not.toHaveClass('invalid');
            expect(errorIcon.isDisplayed()).toBe(false);
            expect(errorMsg.isDisplayed()).toBe(false);
        }
    }

    assertPhoneDetail (phone) {
        const formLabel = this.ele.label;
        formLabel.view.each((label, index) => {
            const key = this.data.fields[index];
            expect(label.$(formLabel.name).getText()).toEqual(`${key}:`);
            expect(label.$(formLabel.value).getText()).toEqual(phone[key]);
        });
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
            browser._.assertCorrectLayout(page, config);
        });
    });

    describe('Phone Detail section:', () => {
        it('should show correct phone detail', () => {
            expect(page.ele.title.getText()).toEqual(page.data.phone.Model);
            expect(page.ele.editBtn.$('i')).toHaveClass('mdi-image-edit');
            page.assertPhoneDetail(page.data.phone);
        });
    });

    describe('Phone Edit section:', () => {
        let formField;
        beforeEach(() => {
            formField = page.ele.field;
        });

        it('should show phone edit view correctly', () => {
            expect(formField.view.get(0).isDisplayed()).toBe(false);
            expect(page.ele.cancelBtn.isDisplayed()).toBe(false);
            expect(page.ele.saveBtn.isDisplayed()).toBe(false);
            // click edit
            page.ele.editBtn.click();
            expect(formField.view.get(0).isDisplayed()).toBe(true);
            expect(page.ele.cancelBtn.isDisplayed()).toBe(true);
            expect(page.ele.saveBtn.isDisplayed()).toBe(true);
            expect(page.ele.saveBtn.isEnabled()).toBe(false);
            // check label/value
            formField.view.each((field, index) => {
                const key = page.data.fields[index];
                const value = page.data.phone[key];
                expect(field.$(formField.label).getText()).toEqual(key);
                if (index === 1) {
                    expect(field.$(formField.selectInput).getAttribute('value'))
                        .toEqual(value);
                } else if (index === 5) {
                    expect(field.$(formField.input).getAttribute('value'))
                        .toEqual(page.data.phone.date);
                } else {
                    expect(field.$(formField.input).getAttribute('value'))
                        .toEqual(value);
                }
            });
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
            const modelEdit = formField.view.get(0);
            const osEdit = formField.view.get(1);
            const priceEdit = formField.view.get(2);
            const sizeEdit = formField.view.get(3);
            const manufacturerEdit = formField.view.get(4);
            const dateEdit = formField.view.get(5);
            // 1. edit model
            const modelInput = modelEdit.$(formField.input);
            page.assertFormFieldError(modelEdit, false);
            // clear model
            modelInput.clear();
            page.assertFormFieldError(modelEdit, true, 'Model field is required!');
            // input legal model
            modelInput.sendKeys(newPhone.Model);
            page.assertFormFieldError(modelEdit, false);
            // 1.1 click cancel
            page.ele.cancelBtn.click();
            // check phone detail not changed
            page.assertPhoneDetail(page.data.phone);
            // re-click edit
            page.ele.editBtn.click();
            // re-edit model
            modelInput.clear();
            modelInput.sendKeys(newPhone.Model);
            // 2. edit os type
            const osInput = osEdit.$(formField.selectInput);
            const osList = osEdit.$(formField.selectContent);
            expect(osList.isDisplayed()).toBe(false);
            // select value in select dropdown list
            browser._.selectValue(osInput, osList, newPhone.OS);
            expect(osList.isDisplayed()).toBe(false);
            expect(osInput.getAttribute('value')).toEqual(newPhone.OS);
            // 3. edit price
            const priceInput = priceEdit.$(formField.input);
            page.assertFormFieldError(priceEdit, false);
            // clear price
            priceInput.clear();
            page.assertFormFieldError(priceEdit, true, 'Price field is required!');
            // input non-number
            priceInput.sendKeys('abc123');
            page.assertFormFieldError(priceEdit, true, 'Price field must be a valid number!');
            // input legal number
            priceInput.clear();
            priceInput.sendKeys('1234');
            page.assertFormFieldError(priceEdit, false);
            // 4. edit screen size
            const sizeInput = sizeEdit.$(formField.input);
            page.assertFormFieldError(sizeEdit, false);
            // clear price
            sizeInput.clear();
            page.assertFormFieldError(sizeEdit, true, 'Screen Size field is required!');
            // input non-number
            sizeInput.sendKeys('abc123');
            page.assertFormFieldError(sizeEdit, true, 'Screen Size must be a valid number!');
            // input legal integer number
            sizeInput.clear();
            sizeInput.sendKeys('1234');
            page.assertFormFieldError(sizeEdit, false);
            // input legal float number
            sizeInput.clear();
            sizeInput.sendKeys(newPhone['Screen Size']);
            page.assertFormFieldError(sizeEdit, false);
            // 5. edit manufacturer
            const manufacturerInput = manufacturerEdit.$(formField.input);
            page.assertFormFieldError(manufacturerEdit, false);
            // clear manufacturer
            manufacturerInput.clear();
            page.assertFormFieldError(manufacturerEdit, true,
                    'Manufacturer field is required!');
            // input legal string
            manufacturerInput.sendKeys(newPhone.Manufacturer);
            page.assertFormFieldError(manufacturerEdit, false);
            // 6. edit release date
            const dateInput = dateEdit.$(formField.input);
            const datepicker = dateEdit.$(formField.datepicker);
            browser._.chooseDate(dateInput, datepicker, newPhone.date);
            expect(dateInput.getAttribute('value')).toEqual(newPhone.date);
            // submit
            expect(page.ele.saveBtn.isEnabled()).toBe(true);
            page.ele.saveBtn.click();
            // check new phone detail
            page.assertPhoneDetail(newPhone);
        });
    });
});
