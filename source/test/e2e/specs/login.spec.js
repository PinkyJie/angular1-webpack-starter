/* global $ */
'use strict';

// page object
var LoginPage = function () {
    var self = this;

    self.url = 'login';
    self.ele = _getAllElements();
    self.urlAfterLogin = 'dashboard';
    self.logoutUrl = 'login?action=logout';

    self.load = load;
    self.loginWithCredential = loginWithCredential;

    ////////

    function _getAllElements () {
        return {
            'loadingView': $('.login-checking'),
            'loadingIcon': $('.login-checking > .mdi-sync'),
            'accountIcon': $('.login-checking > .mdi-account'),
            'loadingText': $('.login-checking > .loading-text'),
            'loginMessage': $('.login-message > p'),
            'emailInput': element(by.model('vm.credential.email')),
            'passwordInput': element(by.model('vm.credential.password')),
            'loginBtn': $('.btn-login')
        };
    }

    function load () {
        browser._.gotoUrl(self.url);
    }

    function loginWithCredential (email, password) {
        self.ele.emailInput.sendKeys(email);
        self.ele.passwordInput.sendKeys(password);
        expect(self.ele.loginBtn.isEnabled()).toBe(true);
        self.ele.loginBtn.click();
    }
};

module.exports = new LoginPage();

// test scenarios
describe('Login Page:', function () {
    var page;
    beforeEach(function () {
        page = new LoginPage();
        page.load();
    });

    afterEach(function () {
        browser._.takeScreenshotIfFail();
    });

    it('should login successfully with correct credential', function () {
        expect(page.ele.loginBtn.isEnabled()).toBe(false);
        page.loginWithCredential('f@f', 'f');
        browser._.expectUrlToMatch(page.urlAfterLogin);
    });

    it('should display error message with incorrect credential', function () {
        expect(page.ele.loginMessage.isPresent()).toBe(false);
        page.loginWithCredential('error@error.com', 'f');
        expect(page.ele.loginMessage.isDisplayed()).toBe(true);
        expect(page.ele.loginMessage.getText())
            .toEqual('Incorrect email or password, please try again!');
    });

    it('should display error message with locked account', function () {
        expect(page.ele.loginMessage.isPresent()).toBe(false);
        page.loginWithCredential('lock@lock.com', 'f');
        expect(page.ele.loginMessage.isDisplayed()).toBe(true);
        expect(page.ele.loginMessage.getText())
            .toEqual('Your account is locked!');
    });

});

describe('Logout Page:', function () {
    var page;
    beforeEach(function () {
        page = new LoginPage();
        browser._.gotoUrl(page.logoutUrl);
    });

    afterEach(function () {
        browser._.takeScreenshotIfFail();
    });

    it('should not display loading view', function () {
        expect(page.ele.loadingView.isPresent()).toBe(false);
    });

    it('should display success logout message', function () {
        expect(page.ele.loginMessage.isDisplayed()).toBe(true);
        expect(page.ele.loginMessage.getText())
            .toEqual('You have been successfully logged out!');
    });
});
