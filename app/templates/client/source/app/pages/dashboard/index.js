import angular from 'angular';

import layout from '../../components/_layout';
import DashboardController from './dashboard.controller';
import appDashboardRun from './dashboard.route';

import banner from '../../components/banner';
import squareMenu from '../../components/square-menu';

export default angular.module('app.pages.dashboard', [
    layout.name,
    banner.name,
    squareMenu.name
])
.controller(DashboardController.name, DashboardController)
.run(appDashboardRun);
