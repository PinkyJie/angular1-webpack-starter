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

import common from './components/_common';
import layout from './components/_layout';

// pages
import home from './pages/home';

angular.module('app', [
    uiRouter,
    ngAnimate,
    ngMessage,
    ngLoadingBar,
    common.name,
    layout.name,
    home.name
]);
