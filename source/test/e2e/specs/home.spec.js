import HomePage from './page-objects/home.page';

describe('Home Page:', () => {
    let page;
    beforeEach(() => {
        page = new HomePage();
        page.load();
    });

    describe('Layout:', () => {
        it('should have correct layout', () => {
            const config = {
                url: '/',
                title: 'Home',
                klass: 'home',
                header: 'prelogin',
                sidebar: false,
                breadcrumb: false
            };
            page.assertCorrectLayout(config);
        });
    });

    describe('Hero section:', () => {
        it('should display correct title and sub title', () => {
            expect(page.ele.mainTitle.getText()).toEqual('Aio Angular App');
            expect(page.ele.subTitle.getText()).toEqual(
                'Awesome web app built on AngularJS & Material Design.');
        });

        it('should go to login page if click get started', () => {
            page.ele.getStartedBtn.click();
            browser._.expectUrlToMatch('login');
        });
    });
});
