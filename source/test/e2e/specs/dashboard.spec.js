import DashboardPage from './page-objects/dashboard.page';

describe('Dashboard Page:', () => {
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
            page.assertCorrectLayout(config);
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
