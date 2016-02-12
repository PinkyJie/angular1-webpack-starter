import loginFormHtml from './login-form.jade';
import LoginFormController from './login-form.controller';

function LoginFormDirective () {
    return {
        restrict: 'AE',
        scope: {},
        controller: `${LoginFormController.name}`,
        controllerAs: 'form',
        bindToController: {
            needCheckLogin: '=',
            userInfo: '=',
            routeAfterLogin: '@',
            loginError: '='
        },
        template: loginFormHtml
    };
}

export default LoginFormDirective;
