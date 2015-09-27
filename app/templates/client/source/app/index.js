// 3rd dependencies
import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'animate.css/animate.css';

// angular
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMessage from 'angular-messages';
import ngLoadingBar from 'angular-loading-bar';

import layout from './components/_layout';

// pages
import home from './pages/home';
import login from './pages/login';
import dashboard from './pages/dashboard';
import phone from './pages/phone';
import notfound from './pages/404';

export default angular.module('app', [
    uiRouter,
    ngAnimate,
    ngMessage,
    ngLoadingBar,
    layout.name,
    home.name,
    login.name,
    dashboard.name,
    phone.name,
    notfound.name
]);
