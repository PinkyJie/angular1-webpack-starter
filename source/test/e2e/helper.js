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
            logoutLink: $header.$('.logout-link'),
            childLink: 'a',
            childIcon: 'a > i'
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
            menuItem: $sidebar.$$(menuItemClass),
            menuLink: $sidebar.$$(`${menuItemClass} > a`),
            menuIcon: $sidebar.$$(`${menuItemClass} > a > i`)
        };
    }

    getBreadcrumb () {
        const $breadcrumb = $('.breadcrumb-view');
        const homeItemClass = '.home-item';
        const breadcrumbItemClass = '.breadcrumb-item';
        return {
            view: $breadcrumb,
            homeItem: $breadcrumb.$(homeItemClass),
            homeLink: $breadcrumb.$(`${homeItemClass} > a`),
            homeIcon: $breadcrumb.$(`${homeItemClass} > a > i`),
            breadcrumbItem: $breadcrumb.$$(breadcrumbItemClass),
            childLink: 'a',
            childIcon: 'i',
            childText: 'span'
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
                expect(header.logoutLink.$(header.childLink).getAttribute('href'))
                    .toEqual(`${browser.baseUrl}/login?action=logout`);
                expect(header.logoutLink.$(header.childIcon)).toHaveClass('mdi-action-exit-to-app ');
                expect(header.logoutLink.getText()).toEqual('Logout');
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
