import HomePage from './home.page';

// login page object
class LoginPage extends browser._BasePageObject {
    constructor () {
        super('login');
        this.urlAfterLogin = 'dashboard';
        this.logoutUrl = 'login?action=logout';
        this.homePage = new HomePage();
    }

    _getAllElements () {
        const $page = $('.login-view');
        return {
            loadingView: $page.$('.login-checking'),
            loginMessage: $page.$('.login-message > p'),
            emailInput: $page.element(by.model('form.credential.email')),
            passwordInput: $page.element(by.model('form.credential.password')),
            loginBtn: $page.$('.btn-login')
        };
    }

    loginWithCredential (email, password) {
        this.ele.emailInput.sendKeys(email);
        this.ele.passwordInput.sendKeys(password);
        expect(this.ele.loginBtn.isEnabled()).toBe(true);
        this.ele.loginBtn.click();
    }
}

export default LoginPage;
