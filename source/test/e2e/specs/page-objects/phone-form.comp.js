// phone form component object
class PhoneFormComp {
    constructor (parentElement) {
        const $form = parentElement.$('.phone-form-view');
        this.fields = ['Model', 'OS', 'Price', 'Screen Size', 'Manufacturer', 'Release Date'];
        this.ele = {
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
            const key = this.fields[index];
            expect(label.$(formLabel.name).getText()).toEqual(`${key}:`);
            expect(label.$(formLabel.value).getText()).toEqual(phone[key]);
        });
    }

    assertEditPhoneDetail (phone) {
        const formField = this.ele.field;
        formField.view.each((field, index) => {
            const key = this.fields[index];
            const value = phone[key];
            expect(field.$(formField.label).getText()).toEqual(key);
            if (index === 1) {
                expect(field.$(formField.selectInput).getAttribute('value'))
                    .toEqual(value);
            } else if (index === 5) {
                expect(field.$(formField.input).getAttribute('value'))
                    .toEqual(phone.date);
            } else {
                expect(field.$(formField.input).getAttribute('value'))
                    .toEqual(value);
            }
        });
    }

    assertEditingForm (phone, isNew) {
        const formField = this.ele.field;
        const modelEdit = formField.view.get(0);
        const osEdit = formField.view.get(1);
        const priceEdit = formField.view.get(2);
        const sizeEdit = formField.view.get(3);
        const manufacturerEdit = formField.view.get(4);
        const dateEdit = formField.view.get(5);
        // 1. edit model
        const modelInput = modelEdit.$(formField.input);
        this.assertFormFieldError(modelEdit, false);
        // clear model
        if (isNew) {
            // make it dirty
            modelInput.sendKeys('aaa');
        }
        modelInput.clear();
        this.assertFormFieldError(modelEdit, true, 'Model field is required!');
        // input legal model
        modelInput.sendKeys(phone.Model);
        this.assertFormFieldError(modelEdit, false);
        // 2. edit os type
        const osInput = osEdit.$(formField.selectInput);
        const osList = osEdit.$(formField.selectContent);
        expect(osList.isDisplayed()).toBe(false);
        // select value in select dropdown list
        browser._.selectValue(osInput, osList, phone.OS);
        expect(osList.isDisplayed()).toBe(false);
        expect(osInput.getAttribute('value')).toEqual(phone.OS);
        // 3. edit price
        const priceInput = priceEdit.$(formField.input);
        this.assertFormFieldError(priceEdit, false);
        if (isNew) {
            // make it dirty
            priceInput.sendKeys('123');
        }
        // clear price
        priceInput.clear();
        this.assertFormFieldError(priceEdit, true, 'Price field is required!');
        // input non-number
        priceInput.sendKeys('abc123');
        this.assertFormFieldError(priceEdit, true, 'Price field must be a valid number!');
        // input legal number
        priceInput.clear();
        priceInput.sendKeys(phone.Price);
        this.assertFormFieldError(priceEdit, false);
        // 4. edit screen size
        const sizeInput = sizeEdit.$(formField.input);
        this.assertFormFieldError(sizeEdit, false);
        if (isNew) {
            // make it dirty
            sizeInput.sendKeys('123');
        }
        // clear price
        sizeInput.clear();
        this.assertFormFieldError(sizeEdit, true, 'Screen Size field is required!');
        // input non-number
        sizeInput.sendKeys('abc123');
        this.assertFormFieldError(sizeEdit, true, 'Screen Size must be a valid number!');
        // input legal integer number
        sizeInput.clear();
        sizeInput.sendKeys('1234');
        this.assertFormFieldError(sizeEdit, false);
        // input legal float number
        sizeInput.clear();
        sizeInput.sendKeys(phone['Screen Size']);
        this.assertFormFieldError(sizeEdit, false);
        // 5. edit manufacturer
        const manufacturerInput = manufacturerEdit.$(formField.input);
        this.assertFormFieldError(manufacturerEdit, false);
        if (isNew) {
            // make it dirty
            manufacturerInput.sendKeys('aaa');
        }
        // clear manufacturer
        manufacturerInput.clear();
        this.assertFormFieldError(manufacturerEdit, true,
                'Manufacturer field is required!');
        // input legal string
        manufacturerInput.sendKeys(phone.Manufacturer);
        this.assertFormFieldError(manufacturerEdit, false);
        // 6. edit release date
        const dateInput = dateEdit.$(formField.input);
        const datepicker = dateEdit.$(formField.datepicker);
        this.assertFormFieldError(dateEdit, false);
        // clear date
        browser._.clearDate(dateInput, datepicker);
        expect(dateInput.getAttribute('value')).toEqual('');
        this.assertFormFieldError(dateEdit, true, 'Release Date field is required!');
        // choose a date
        browser._.chooseDate(dateInput, datepicker, phone.date);
        expect(dateInput.getAttribute('value')).toEqual(phone.date);
        // submit
        expect(this.ele.saveBtn.isEnabled()).toBe(true);
        this.ele.saveBtn.click();
    }
}

export default PhoneFormComp;
