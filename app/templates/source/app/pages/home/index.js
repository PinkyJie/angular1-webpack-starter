import angular from 'angular';

import layout from '../../components/_layout';
import {homeHero} from '../../components/home-hero';
import appHomeRun from './home.route';

export default angular.module('app.pages.home', [
    layout.name,
    homeHero.name
])
    .run(appHomeRun);
