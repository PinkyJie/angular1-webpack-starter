// base page object that all page objects will inherit
class BasePageObject {
    constructor (url) {
        Object.assign(this, {url});

        this.ele = this._getAllElements();
    }

    load () {
        browser._.gotoUrl(this.url);
    }

    getHeader () {
        const $header = $('.header-view');
        return {
            title: $header.$('.brand-logo'),
            userName: $header.$('.header-user-name'),
            dropdown: $header.$('.header-dropdown'),
            dropdownButton: $header.$('.dropdown-button'),
            dropdownContent: $header.$('.dropdown-content'),
            logoutLink: $header.$('.logout-link')
        };
    }

    getFooter () {
        const $footer = $('.footer-view');
        return {
            copyright: $footer.$('.copyright'),
            link: $footer.$('.copyright > a')
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
}

export {BasePageObject, E2EHelper};
