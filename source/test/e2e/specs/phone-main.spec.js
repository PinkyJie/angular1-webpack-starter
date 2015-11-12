import loginPage from './login.spec';

// page object
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
        browser._.expectUrlToMatch(loginPage.url);
        loginPage.loginWithCredential('f@f', 'f');
        browser._.expectUrlToMatch(this.url);
    }
}

module.exports = new PhonePage();

// test scenarios
describe('Phone Main Page:', () => {
    let page;
    beforeEach(() => {
        page = new PhonePage();
        page.load();
    });

    describe('Layout:', () => {
        it('should have correct layout', () => {
            const config = {
                url: 'phone',
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
                            link: false,
                            text: 'Phone List'
                        }
                    ]
                }
            };
            page.assertCorrectLayout(config);
        });
    });

    describe('Button section:', () => {
        it('should show add new phone button', () => {
            const btn = page.ele.addNewBtn;
            expect(btn.getAttribute('href')).toEqual(`${browser.baseUrl}/phone/add`);
            expect(btn.getText()).toEqual('ADD NEW');
        });
    });

    describe('Table section:', () => {
        it('should show correct table', () => {
            // table header
            const header = ['Model', 'OS', 'Price', 'Action'];
            page.ele.tableHeader.each((th, index) => {
                expect(th.getText()).toEqual(header[index]);
            });
            // table content
            const phoneList = page.ele.phoneItem;
            expect(phoneList.view.count()).toBe(5);
            // first row
            const first = phoneList.view.get(0);
            const expectedFirst = ['iPhone 6', 'iOS', '5288'];
            first.$$(phoneList.cell).each((td, index) => {
                if (index === 3) {
                    const firstBtn = td.$(phoneList.firstBtn);
                    expect(firstBtn).toHaveClass('blue');
                    expect(firstBtn.$(phoneList.icon)).toHaveClass('mdi-action-info');
                    const secondBtn = td.$(phoneList.secondBtn);
                    expect(secondBtn).toHaveClass('red');
                    expect(secondBtn.$(phoneList.icon)).toHaveClass('mdi-action-delete');
                    return;
                }
                expect(td.getText()).toEqual(expectedFirst[index]);
            });
            // click view
            first.$$(phoneList.cell).get(3).$(phoneList.firstBtn).click();
            browser._.expectUrlToMatch('phone/1');
            // back to phone List
            const sidebar = page.getSidebar();
            sidebar.menuItem.view.get(1).$(sidebar.menuItem.link).click();
            browser._.expectUrlToMatch(page.url);
            // third row
            const third = phoneList.view.get(2);
            const expectedThird = ['Nexus 6', 'Android', '4400'];
            third.$$(phoneList.cell).each((td, index) => {
                if (index === 3) {
                    return;
                }
                expect(td.getText()).toEqual(expectedThird[index]);
            });
            // click delete
            const modal = page.getModal();
            expect(modal.view.isPresent()).toBe(false);
            third.$$(phoneList.cell).get(3).$(phoneList.secondBtn).click();
            // modal
            expect(modal.view.isDisplayed()).toBe(true);
            expect(modal.title.getText()).toEqual('Are your sure?');
            expect(modal.body.getText())
                .toEqual(`All information about [${expectedThird[0]}] will be REMOVED!`);
            // click cancel
            modal.cancelBtn.click();
            expect(modal.view.isPresent()).toBe(false);
            expect(third.$$(phoneList.cell).get(0).getText()).toEqual(expectedThird[0]);
            expect(phoneList.view.count()).toBe(5);
            // show modal again
            third.$$(phoneList.cell).get(3).$(phoneList.secondBtn).click();
            // click ok
            modal.okBtn.click();
            expect(modal.view.isPresent()).toBe(false);
            expect(third.$$(phoneList.cell).get(0).getText())
                .not.toEqual(expectedThird[0]);
            expect(phoneList.view.count()).toBe(4);
        });
    });
});
