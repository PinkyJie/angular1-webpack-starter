// base page object that all page objects will inherit
class BasePageObject {
    constructor (url) {
        Object.assign(this, {url});

        this.ele = this._getAllElements();
        this.mainTitle = 'Aio Angular App';
    }

    load () {
        browser._.gotoUrl(this.url);
    }

    getHeader () {
        const $header = $('.header-view');
        return {
            view: $header,
            title: $header.$('.brand-logo'),
            menus: $header.$('.header-menus'),
            userName: $header.$('.header-user-name'),
            dropdown: $header.$('.header-dropdown'),
            dropdownButton: $header.$('.dropdown-button'),
            dropdownIcon: $header.$('.dropdown-button > i'),
            dropdownContent: $header.$('.dropdown-content'),
            logoutLink: {
                view: $header.$('.logout-link'),
                link: 'a',
                icon: 'a > i'
            }
        };
    }

    getFooter () {
        const $footer = $('.footer-view');
        return {
            view: $footer,
            copyright: $footer.$('.copyright'),
            link: $footer.$('.copyright > a')
        };
    }

    getSidebar () {
        const $sidebar = $('.sidebar-view');
        const menuItemClass = '.menu-item';
        return {
            view: $sidebar,
            menuItem: {
                view: $sidebar.$$(menuItemClass),
                link: 'a',
                icon: 'a > i'
            }
        };
    }

    getBreadcrumb () {
        const $breadcrumb = $('.breadcrumb-view');
        const homeItemClass = '.home-item';
        const breadcrumbItemClass = '.breadcrumb-item';
        return {
            view: $breadcrumb,
            homeItem: {
                view: $breadcrumb.$(homeItemClass),
                link: 'a',
                icon: 'a > i'
            },
            breadcrumbItem: {
                view: $breadcrumb.$$(breadcrumbItemClass),
                link: 'a',
                icon: 'i',
                text: 'span'
            }
        };
    }
}

class E2EHelper {
    gotoUrl (url) {
        browser.get(`${browser.baseUrl}/${url}`);
    }

    expectUrlToMatch (url) {
        expect(browser.getCurrentUrl()).toMatch(new RegExp(url));
    }

    // shared test case
    testURLAndTitleAndClass (Page, url, title, klass) {
        describe('URL and Title:', () => {
            let mainTitle;
            beforeEach(() => {
                const page = new Page();
                page.load();
                mainTitle = page.mainTitle;
            });
            it('should have correct browser url and title and class', () => {
                browser._.expectUrlToMatch(url);
                expect(browser.getTitle()).toEqual(`${title} - ${mainTitle}`);
                expect($('body')).toHaveClass(`${klass}-page`);
            });
        });
    }

    testPreloginHeader (Page) {
        describe('Header section:', () => {
            let header;
            beforeEach(() => {
                const page = new Page();
                page.load();
                header = page.getHeader();
            });
            it('should display correct prelogin header', () => {
                expect(header.title.getText()).toEqual('Aio Angular App');
                expect(header.menus.isPresent()).toBe(false);
            });
        });
    }

    testLoginHeader (Page) {
        describe('Header section:', () => {
            let header;
            beforeEach(() => {
                const page = new Page();
                page.load();
                header = page.getHeader();
            });
            it('should display correct login header', () => {
                expect(header.title.getText()).toEqual('Aio Angular App');
                expect(header.menus.isPresent()).toBe(true);
                expect(header.userName.getText()).toEqual('PinkyJie');
                // dropdown button icon
                expect(header.dropdownIcon).toHaveClass('mdi-navigation-more-vert');
                expect(header.dropdownContent.isDisplayed()).toBe(false);
                header.dropdownButton.click();
                expect(header.dropdownContent.isDisplayed()).toBe(true);
                const logoutLink = header.logoutLink;
                expect(logoutLink.view.$(logoutLink.link).getAttribute('href'))
                    .toEqual(`${browser.baseUrl}/login?action=logout`);
                expect(logoutLink.view.$(logoutLink.icon)).toHaveClass('mdi-action-exit-to-app');
                expect(logoutLink.view.$(logoutLink.link).getText()).toEqual('Logout');
            });
        });
    }

    testFooter (Page) {
        describe('Footer section:', () => {
            let footer;
            beforeEach(() => {
                const page = new Page();
                page.load();
                footer = page.getFooter();
            });
            it('should display correct footer', () => {
                expect(footer.copyright.getText()).toEqual('Copyright © 2015. AIO-Angular generator.');
            });
        });
    }

    testNoSidebar (Page) {
        let sidebar;
        beforeEach(() => {
            const page = new Page();
            page.load();
            sidebar = page.getSidebar();
        });
        describe('Sidebar section:', () => {
            it('should not display sidebar section', () => {
                expect(sidebar.view.getText()).toEqual('');
            });
        });
    }

    testNoBreadcrumb (Page) {
        let breadcrumb;
        beforeEach(() => {
            const page = new Page();
            page.load();
            breadcrumb = page.getBreadcrumb();
        });
        describe('Breadcrumb section:', () => {
            it('should not display breadcrumb section', () => {
                expect(breadcrumb.view.getText()).toEqual('');
            });
        });
    }

    testSidebar (Page, expectedItems) {
        let sidebar;
        beforeEach(() => {
            const page = new Page();
            page.load();
            sidebar = page.getSidebar();
        });
        describe('Sidebar section:', () => {
            it('should display correct sidebar', () => {
                expect(sidebar.menuItem.view.count()).toEqual(expectedItems.length);
                // items
                sidebar.menuItem.view.each((item, index) => {
                    const expected = expectedItems[index];
                    expect(item.$(sidebar.menuItem.link).getAttribute('href'))
                        .toEqual(`${browser.baseUrl}/${expected.link}`);
                    expect(item.$(sidebar.menuItem.icon)).toHaveClass(expected.icon);
                    expect(item.$(sidebar.menuItem.link).getText()).toEqual(expected.text);
                });
            });
        });
    }

    testBreadcrumb (Page, expectedItems) {
        let breadcrumb;
        beforeEach(() => {
            const page = new Page();
            page.load();
            breadcrumb = page.getBreadcrumb();
        });
        describe('Breadcrumb section:', () => {
            it('should display correct breadcrumb', () => {
                // home icon
                const homeItem = breadcrumb.homeItem;
                expect(homeItem.view.isDisplayed()).toBe(true);
                expect(homeItem.view.$(homeItem.link).getAttribute('href'))
                    .toEqual(`${browser.baseUrl}/`);
                expect(homeItem.view.$(homeItem.icon)).toHaveClass('mdi-action-home');
                // items
                expect(breadcrumb.breadcrumbItem.view.count()).toEqual(expectedItems.length);
                breadcrumb.breadcrumbItem.view.each((item, index) => {
                    const expected = expectedItems[index];
                    expect(item.$(breadcrumb.breadcrumbItem.link).isPresent()).toBe(expected.link);
                    expect(item.$(breadcrumb.breadcrumbItem.icon))
                        .toHaveClass('mdi-navigation-chevron-right');
                    expect(item.$(breadcrumb.breadcrumbItem.text).getText()).toEqual(expected.text);
                });
            });
        });
    }
}

const customMatchers = {
    toHaveClass: () => {
        return {
            compare: (actual, expected) => {
                return {
                    pass: actual.getAttribute('class').then((classes) => {
                        return classes.split(' ').indexOf(expected) !== -1;
                    })
                };
            }
        };
    }
};

export {BasePageObject, E2EHelper, customMatchers};
