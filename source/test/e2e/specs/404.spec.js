import NotFoundPage from './page-objects/404.page';

describe('404 Page:', () => {
    let page;
    beforeEach(() => {
        page = new NotFoundPage();
        page.load();
    });

    describe('Layout:', () => {
        it('should have correct layout', () => {
            const config = {
                url: '404',
                title: '404',
                klass: 'notfound',
                header: 'prelogin',
                sidebar: false,
                breadcrumb: {
                    items: [
                        {
                            link: false,
                            text: '404'
                        }
                    ]
                }
            };
            page.assertCorrectLayout(config);
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
