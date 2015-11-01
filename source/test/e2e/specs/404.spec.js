// page object
class NotFoundPage extends browser._BasePageObject {
    constructor () {
        super('404');
    }

    _getAllElements () {
        const $page = $('.not-found-view');
        return {
            text: $page.$('h2')
        };
    }
}

module.exports = new NotFoundPage();

// test scenarios
describe('404 Page:', () => {
    let page;
    beforeEach(() => {
        page = new NotFoundPage();
        page.load();
    });

    browser._.testURLAndTitleAndClass(NotFoundPage, '404', `404`, 'notfound');
    browser._.testPreloginHeader(NotFoundPage);
    browser._.testFooter(NotFoundPage);

    describe('Sidebar section:', () => {
        it('should not display sidebar section', () => {
            const sidebar = page.getSidebar();
            expect(sidebar.view.getText()).toEqual('');
        });
    });

    describe('Breadcrumb section:', () => {
        it('should display correct breadcrumb', () => {
            const breadcrumb = page.getBreadcrumb();
            expect(breadcrumb.breadcrumbItem.count()).toEqual(1);
            // home icon
            expect(breadcrumb.homeItem.isDisplayed()).toBe(true);
            expect(breadcrumb.homeLink.getAttribute('href')).toEqual(`${browser.baseUrl}/`);
            expect(breadcrumb.homeIcon).toHaveClass('mdi-action-home');
            // 404 text
            const notfoundItem = breadcrumb.breadcrumbItem.get(0);
            expect(notfoundItem.$(breadcrumb.childLink).isPresent()).toBe(false);
            expect(notfoundItem.$(breadcrumb.childIcon)).toHaveClass('mdi-navigation-chevron-right');
            expect(notfoundItem.$(breadcrumb.childText).getText()).toEqual('404');
        });
    });

    describe('Main section:', () => {
        it('should display 404 text', () => {
            expect(page.ele.text.getText()).toEqual('404 Not Found');
        });
    });

    it('should redirect user to 404 with non-exist URL', () => {
        browser._.gotoUrl('aaa');
        browser._.expectUrlToMatch('404');
    });
});
