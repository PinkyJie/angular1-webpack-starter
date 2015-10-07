import angular from 'angular';

import LoginFormController from './login-form.controller';
import LoginFormDirective from './login-form.directive';

const loginForm = angular.module('app.components.loginForm', [])
    .controller(LoginFormController.name, LoginFormController)
    .directive(`aioLoginForm`, LoginFormDirective);

export default loginForm;
