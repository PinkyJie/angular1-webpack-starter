import angular from 'angular';

import loginForm from '../../components/login-form';
import LoginController from './login.controller';

export default angular.module('app.pages.login', [
    loginForm.name
])
    .controller(LoginController.name, LoginController);
