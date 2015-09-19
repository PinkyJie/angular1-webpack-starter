import angular from 'angular';

import layout from '../../components/_common';
import appHomeRun from './home.route';

export default angular.module('app.pages.home', [layout.name])
    .run(appHomeRun);
