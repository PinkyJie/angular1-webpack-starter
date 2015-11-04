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
            copyright: $footer.$('.copyright')
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
    assertCorrectLayout (page, config) {
        // URL/title/class
        browser._.expectUrlToMatch(config.url);
        expect(browser.getTitle()).toEqual(`${config.title} - ${page.mainTitle}`);
        expect($('body')).toHaveClass(`${config.klass}-page`);
        // header section
        const header = page.getHeader();
        if (config.header === 'prelogin') { // prelogin
            expect(header.title.getText()).toEqual('Aio Angular App');
            expect(header.menus.isPresent()).toBe(false);
        } else { // logged in
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
        }
        // footer section
        const footer = page.getFooter();
        expect(footer.copyright.getText()).toEqual('Copyright © 2015. AIO-Angular generator.');
        // sidebar section
        const sidebar = page.getSidebar();
        if (config.sidebar) { // has sidebar
            const expectedSidebarItems = config.sidebar.items;
            expect(sidebar.menuItem.view.count()).toEqual(expectedSidebarItems.length);
            // items
            sidebar.menuItem.view.each((item, index) => {
                const expected = expectedSidebarItems[index];
                expect(item.$(sidebar.menuItem.link).getAttribute('href'))
                    .toEqual(`${browser.baseUrl}/${expected.link}`);
                expect(item.$(sidebar.menuItem.icon)).toHaveClass(expected.icon);
                expect(item.$(sidebar.menuItem.link).getText()).toEqual(expected.text);
                if (expected.active) {
                    expect(item).toHaveClass('active');
                } else {
                    expect(item).not.toHaveClass('active');
                }
            });
        } else { // no sidebar
            expect(sidebar.view.getText()).toEqual('');
        }
        // breadcrumb section
        const breadcrumb = page.getBreadcrumb();
        if (config.breadcrumb) { // has sidebar
            const expectedBreadcrumbItems = config.breadcrumb.items;
            // home icon
            const homeItem = breadcrumb.homeItem;
            expect(homeItem.view.isDisplayed()).toBe(true);
            expect(homeItem.view.$(homeItem.link).getAttribute('href'))
                .toEqual(`${browser.baseUrl}/`);
            expect(homeItem.view.$(homeItem.icon)).toHaveClass('mdi-action-home');
            // items
            expect(breadcrumb.breadcrumbItem.view.count()).toEqual(expectedBreadcrumbItems.length);
            breadcrumb.breadcrumbItem.view.each((item, index) => {
                const expected = expectedBreadcrumbItems[index];
                expect(item.$(breadcrumb.breadcrumbItem.link).isPresent()).toBe(expected.link);
                expect(item.$(breadcrumb.breadcrumbItem.icon))
                    .toHaveClass('mdi-navigation-chevron-right');
                expect(item.$(breadcrumb.breadcrumbItem.text).getText()).toEqual(expected.text);
            });
        } else { // no sidebar
            expect(breadcrumb.view.getText()).toEqual('');
        }
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
