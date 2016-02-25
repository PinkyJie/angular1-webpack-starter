import LoginPage from './page-objects/login.page';

describe('Login Page:', () => {
    let page;
    beforeEach(() => {
        page = new LoginPage();
        page.load();
    });

    describe('Layout:', () => {
        it('should have correct layout', () => {
            const config = {
                url: 'login',
                title: 'Login',
                klass: 'login',
                header: 'prelogin',
                sidebar: false,
                breadcrumb: false
            };
            page.assertCorrectLayout(config);
        });
    });

    describe('Login form section:', () => {
        it('should login successfully with correct credential', () => {
            expect(page.ele.loginBtn.isEnabled()).toBe(false);
            page.loginWithCredential('f@f', 'f');
            browser._.expectUrlToMatch(page.urlAfterLogin);
        });

        it('should display error message with incorrect credential', () => {
            expect(page.ele.loginMessage.isPresent()).toBe(false);
            page.loginWithCredential('error@error.com', 'f');
            expect(page.ele.loginMessage.isDisplayed()).toBe(true);
            expect(page.ele.loginMessage.getText())
                .toEqual('Incorrect email or password, please try again!');
        });

        it('should display error message with locked account', () => {
            expect(page.ele.loginMessage.isPresent()).toBe(false);
            page.loginWithCredential('lock@lock.com', 'f');
            expect(page.ele.loginMessage.isDisplayed()).toBe(true);
            expect(page.ele.loginMessage.getText())
                .toEqual('Your account is locked!');
        });

        it('should automatically log user to dashboard if user has already logged in', () => {
            page.loginWithCredential('f@f', 'f');
            browser._.expectUrlToMatch(page.urlAfterLogin);
            // go back to home page
            page.getHeader().title.click();
            page.homePage.ele.getStartedBtn.click();
            // go to login page will redirect user to dashboard
            browser._.expectUrlToMatch(page.urlAfterLogin);
        });
    });
});

describe('Logout Page:', () => {
    let page;
    beforeEach(() => {
        page = new LoginPage();
        browser._.gotoUrl(page.logoutUrl);
    });

    it('should not display loading view', () => {
        expect(page.ele.loadingView.isPresent()).toBe(false);
    });

    it('should display success logout message', () => {
        expect(page.ele.loginMessage.isDisplayed()).toBe(true);
        expect(page.ele.loginMessage.getText())
            .toEqual('You have been successfully logged out!');
    });
});
