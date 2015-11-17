import angular from 'angular';

import DashboardController from './dashboard.controller';

import banner from '../../components/banner';
import squareMenu from '../../components/square-menu';

export default angular.module('app.pages.dashboard', [
    banner.name,
    squareMenu.name
])
    .controller(DashboardController.name, DashboardController);
