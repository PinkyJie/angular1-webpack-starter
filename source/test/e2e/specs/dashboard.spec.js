import loginPage from './login.spec';

// page object
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
        browser._.expectUrlToMatch(loginPage.url);
        loginPage.loginWithCredential('f@f', 'f');
        browser._.expectUrlToMatch(this.url);
    }
}

module.exports = new DashboardPage();

// test scenarios
fdescribe('Dashboard Page:', () => {
    let page;
    beforeEach(() => {
        page = new DashboardPage();
        page.load();
    });

    describe('Layout:', () => {
        it('should have correct layout', () => {
            const config = {
                url: 'dashboard',
                title: 'Dashboard',
                klass: 'dashboard',
                header: 'login',
                sidebar: {
                    items: [
                        {
                            link: 'dashboard',
                            active: true,
                            icon: 'mdi-action-dashboard',
                            text: 'DASHBOARD'
                        },
                        {
                            link: 'phone',
                            active: false,
                            icon: 'mdi-hardware-phone-android',
                            text: 'PHONES'
                        }
                    ]
                },
                breadcrumb: {
                    items: [
                        {
                            link: false,
                            text: 'Dashboard'
                        }
                    ]
                }
            };
            browser._.expectCorrectLayout(page, config);
        });
    });

    describe('Banner section:', () => {
        it('should have correct banner text', () => {
            expect(page.ele.bannerText.getText()).toEqual('Welcome PinkyJie!');
        });
    });

    describe('Menu Box section:', () => {
        it('should display correct menu box', () => {
            const colors = ['indigo', 'red', 'pink'];
            const boxes = page.ele.menuBox;
            const expectedMenus = [
                {
                    icon: 'mdi-hardware-phone-android',
                    count: '5',
                    name: 'PHONE',
                    link: 'phone'
                }
            ];
            expect(boxes.view.count()).toBe(1);
            boxes.view.each((box, index) => {
                const expectedMenu = expectedMenus[index];
                expect(box).toHaveClass(colors[index % colors.length]);
                expect(box.getAttribute('href')).toEqual(`${browser.baseUrl}/${expectedMenu.link}`);
                expect(box.$(boxes.icon)).toHaveClass(expectedMenu.icon);
                expect(box.$(boxes.name).getText()).toEqual(expectedMenu.name);
                expect(box.$(boxes.count).getText()).toEqual(expectedMenu.count);
            });
        });
    });
});
