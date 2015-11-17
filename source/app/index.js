// 3rd dependencies
import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'animate.css/animate.css';

// angular
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMessage from 'angular-messages';
import 'oclazyload';

import layout from './components/_layout';
import loading from './components/loading';
import modal from './components/modal';

// routes
import homeRoute from './pages/home/home.route';
import loginRoute from './pages/login/login.route';
import dashboardRoute from './pages/dashboard/dashboard.route';
import phoneRoute from './pages/phone/phone.route';
import notfoundRoute from './pages/404/404.route';

export default angular.module('app', [
    'oc.lazyLoad',
    uiRouter,
    ngAnimate,
    ngMessage,
    layout.name,
    loading.name,
    modal.name,
    homeRoute.name,
    loginRoute.name,
    dashboardRoute.name,
    phoneRoute.name,
    notfoundRoute.name
]);
