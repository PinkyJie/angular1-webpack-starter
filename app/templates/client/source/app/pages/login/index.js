import angular from 'angular';

import layout from '../../components/_layout';
import loginForm from '../../components/login-form';
import LoginController from './login.controller';
import appLoginRun from './login.route';

export default angular.module('app.pages.login', [
    layout.name,
    loginForm.name
])
.controller(LoginController.name, LoginController)
.run(appLoginRun);
