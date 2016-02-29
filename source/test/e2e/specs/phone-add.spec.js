import PhoneAddPage from './page-objects/phone-add.page';

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
        it('should have correct initial state', () => {
            expect(page.ele.title.getText()).toEqual('Add a new phone');
            expect(page.ele.form.ele.cancelBtn.isDisplayed()).toBe(false);
            expect(page.ele.form.ele.saveBtn.isEnabled()).toBe(false);
            page.ele.form.assertEditPhoneDetail(page.data.phone);
        });

        it('should add phone correctly via form', () => {
            const now = new Date();
            const newPhone = {
                Model: 'iPhone 17',
                OS: 'iOS',
                Price: '9999',
                'Screen Size': '9.9',
                Manufacturer: 'AppleApple',
                'Release Date': 'November 20, 2015',
                // always use today's date for easy testing
                date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
            };
            page.ele.form.assertEditingForm(newPhone, true);
            // back to phone main page
            browser._.expectUrlToMatch(page.phonePage.url);
            // check last item is the new added item
            const phoneList = page.phonePage.ele.phoneItem;
            expect(phoneList.view.count()).toEqual(6);
            const lastItem = phoneList.view.get(5);
            const expectedItem = [newPhone.Model, newPhone.OS, newPhone.Price];
            browser._.isMobile().then((isSmall) => {
                lastItem.$$(phoneList.cell).each((td, index) => {
                    if (index === 3) {
                        // ignore the last cell
                        return;
                    }
                    if (isSmall && (index === 1 || index === 2)) {
                        expect(td.isDisplayed()).toBe(false);
                    } else {
                        expect(td.getText()).toEqual(expectedItem[index]);
                    }
                });
            });
        });
    });
});
