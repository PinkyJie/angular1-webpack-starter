import angular from 'angular';
import ngLoadingBar from 'angular-loading-bar';

import appLoadingConfig from './config';
import './loading.styl';

const loading = angular.module('app.components.loading', [
    ngLoadingBar
])
    .config(appLoadingConfig);

export default loading;
