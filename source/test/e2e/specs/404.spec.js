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
    browser._.testNoSidebar(NotFoundPage);
    browser._.testBreadcrumb(NotFoundPage, [
        {
            link: false,
            text: '404'
        }
    ]);

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
