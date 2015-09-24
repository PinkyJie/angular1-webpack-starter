import angular from 'angular';

import layout from '../../components/_layout';
import appNotFoundRun from './404.route';

export default angular.module('app.pages.404', [layout.name])
    .run(appNotFoundRun);
